const https = require("https");
const whatsappConfig = require("@config/whatsapp.config");

/**
 * Format phone number to WhatsApp international standard (e.g., 919876543210)
 * Removes spaces, hyphens, plus signs, brackets, and adds Indian country code if missing 10 digits.
 */
function formatPhoneNumber(phone) {
  if (!phone) return null;
  let cleaned = String(phone).replace(/[^\d]/g, "");
  if (!cleaned) return null;

  // Remove leading zeros (e.g., 09826953206 -> 9826953206)
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.replace(/^0+/, "");
  }

  // If 10-digit standard Indian phone number, prepend 91
  if (cleaned.length === 10) {
    cleaned = "91" + cleaned;
  }

  return cleaned;
}

/**
 * Helper to format date cleanly
 */
function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Make an HTTPS POST request to Meta WhatsApp Graph API
 */
function callMetaApi(payload, version = null) {
  return new Promise((resolve) => {
    const apiVersion = version || whatsappConfig.API_VERSION || "v21.0";
    const path = `/${apiVersion}/${whatsappConfig.PHONE_NUMBER_ID}/messages`;
    const postData = JSON.stringify(payload);

    const options = {
      hostname: "graph.facebook.com",
      port: 443,
      path: path,
      method: "POST",
      headers: {
        Authorization: `Bearer ${whatsappConfig.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ success: true, statusCode: res.statusCode, data: parsed });
          } else {
            resolve({
              success: false,
              statusCode: res.statusCode,
              error: parsed,
            });
          }
        } catch (err) {
          resolve({
            success: false,
            statusCode: res.statusCode,
            raw: data,
            error: err.message,
          });
        }
      });
    });

    req.on("error", (err) => {
      resolve({ success: false, error: err.message });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Sends a generic text message to a WhatsApp number.
 * Automatically retries on fallback API version if Meta returns alias/version error.
 */
async function sendTextMessage(to, message) {
  try {
    const formattedTo = formatPhoneNumber(to);
    if (!formattedTo) {
      console.warn("[WhatsApp] Invalid phone number provided:", to);
      return { success: false, message: "Invalid phone number" };
    }

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedTo,
      type: "text",
      text: {
        preview_url: false,
        body: message,
      },
    };

    let result = await callMetaApi(payload, whatsappConfig.API_VERSION);

    // If version error (e.g., v26.0 doesn't exist yet, code 803), fallback to stable v21.0
    if (
      !result.success &&
      result.error &&
      result.error.error &&
      result.error.error.code === 803 &&
      whatsappConfig.API_VERSION !== whatsappConfig.FALLBACK_API_VERSION
    ) {
      console.log(
        `[WhatsApp] Version ${whatsappConfig.API_VERSION} not available, retrying with ${whatsappConfig.FALLBACK_API_VERSION}...`
      );
      result = await callMetaApi(payload, whatsappConfig.FALLBACK_API_VERSION);
    }

    if (result.success) {
      console.log(`[WhatsApp] Message successfully sent to ${formattedTo}:`, result.data);
    } else {
      console.error(`[WhatsApp] Failed to send message to ${formattedTo}:`, JSON.stringify(result.error || result));
    }

    return result;
  } catch (error) {
    console.error("[WhatsApp] Error sending text message:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a template message to a WhatsApp number.
 */
async function sendTemplateMessage(to, templateName, languageCode = "en", components = []) {
  try {
    const formattedTo = formatPhoneNumber(to);
    if (!formattedTo) {
      console.warn("[WhatsApp] Invalid phone number provided:", to);
      return { success: false, message: "Invalid phone number" };
    }

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedTo,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components: components,
      },
    };

    const result = await callMetaApi(payload);
    return result;
  } catch (error) {
    console.error("[WhatsApp] Error sending template message:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 1 & 2. Format & send Driver + Transport details on WhatsApp
 * Used by b2bDriver/create and b2bDriver/update
 */
async function sendDriverTransportDetails({
  to,
  companyName,
  groupName,
  transportDetails = [],
  driverDetails = [],
  isUpdate = false,
}) {
  try {
    if (!to) {
      console.warn("[WhatsApp] No recipient WhatsApp number provided for driver details notification.");
      return { success: false, message: "No recipient WhatsApp number" };
    }

    // Format Transport Details
    let transportSection = "";
    if (transportDetails && transportDetails.length > 0) {
      transportSection = transportDetails
        .map((t, idx) => {
          const from = t.assign_from || "-";
          const toLoc = t.assign_to || "-";
          const date = formatDate(t.assign_date);
          const time = t.assign_time || "-";
          const notes = t.notes ? `\n📝 *Remarks:* ${t.notes}` : "";
          return `🔹 *Trip ${idx + 1}:* ${from} ➡️ ${toLoc}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}${notes}`;
        })
        .join("\n\n");
    } else {
      transportSection = "No transport details available.";
    }

    // Format Driver Details
    let driverSection = "";
    if (driverDetails && driverDetails.length > 0) {
      driverSection = driverDetails
        .map((d, idx) => {
          const name = d.driver_name || "-";
          const mobile = d.driver_mobile || "-";
          const bus = d.bus_no || "-";
          const remarks = d.remarks ? `\n📝 *Remarks:* ${d.remarks}` : "";
          return `👤 *Driver ${idx + 1}:* ${name}\n📱 *Mobile:* ${mobile}\n🚌 *Bus No:* ${bus}${remarks}`;
        })
        .join("\n\n");
    } else {
      driverSection = "No driver details available.";
    }

    const titleHeader = isUpdate
      ? "⚠️ *PC TRAVELS - UPDATED DRIVER & TRANSPORT DETAILS* ⚠️"
      : "🕋 *PC TRAVELS - DRIVER & TRANSPORT DETAILS* 🕋";

    const openingText = isUpdate
      ? "This is to inform you that there has been an *UPDATE* in the driver or vehicle assignment for your group. Please find the latest confirmed details below:"
      : "We are pleased to provide the confirmed driver and vehicle details for your group:";

    const message = `${titleHeader}
━━━━━━━━━━━━━━━━━━
Dear *${companyName || "Valued Customer"}*,

Assalamu Alaikum Warahmatullahi Wabarakatuh.
${openingText}

📌 *Group Number:* *${groupName || "N/A"}*

🚗 *TRANSPORT DETAILS:*
${transportSection}

👤 *DRIVER DETAILS:*
${driverSection}

━━━━━━━━━━━━━━━━━━
📞 *24/7 Operations Support:* \n +919826953206
We are honored to be of service and pray that your group's Umrah is accepted and spiritually fulfilling.

*Team PC Travels*`;

    return await sendTextMessage(to, message);
  } catch (error) {
    console.error("[WhatsApp] Error sending driver/transport details:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 3. Send B2B User Account Activated message on WhatsApp
 * Used by b2bAdmin/update when status === 'complete'
 */
async function sendB2bAccountActivated({ to, personName, email, password, b2bId }) {
  try {
    if (!to) {
      console.warn("[WhatsApp] No WhatsApp number found for account activation notification.");
      return { success: false, message: "No WhatsApp number" };
    }

    const message = `🎉 *WELCOME TO PC TRAVELS - ACCOUNT ACTIVATED* 🎉
━━━━━━━━━━━━━━━━━━
Dear *${personName || "Valued Partner"}*,

Assalamu Alaikum Warahmatullahi Wabarakatuh.
We are pleased to inform you that your *PC Travels B2B Account* has been successfully *ACTIVATED*!

You can now log in using the credentials below:
🆔 *B2B ID:* ${b2bId || "-"}
📧 *Email:* ${email}
🔑 *Password:* ${password}

🌐 *Login Portal:* https://pctravelsonline.com/b2b/login

⚠️ *Security Note:* Please change your password after your first login.
📞 *Technical Support:* +91 98269 53206

We look forward to a successful and blessed partnership ahead!

*Team PC Travels*`;

    return await sendTextMessage(to, message);
  } catch (error) {
    console.error("[WhatsApp] Error sending account activated message:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send B2B User Account On Hold message on WhatsApp
 * Used by b2bAdmin/update when status === 'hold'
 */
async function sendB2bAccountHold({ to, personName, reason }) {
  try {
    if (!to) {
      console.warn("[WhatsApp] No WhatsApp number found for account hold notification.");
      return { success: false, message: "No WhatsApp number" };
    }

    const message = `⚠️ *PC TRAVELS - ACCOUNT NOTICE: ON HOLD* ⚠️
━━━━━━━━━━━━━━━━━━
Dear *${personName || "Valued Partner"}*,

We regret to inform you that your *PC Travels B2B Account* has been temporarily placed *ON HOLD*.
You will not be able to log in until this issue is resolved.

📌 *Reason:* ${reason || "Account temporarily suspended by admin."}

Our support team is reviewing your case and will contact you shortly.
📞 *24/7 Support Team:* \n +919826953206

We appreciate your patience and understanding.

*Team PC Travels*`;

    return await sendTextMessage(to, message);
  } catch (error) {
    console.error("[WhatsApp] Error sending account hold message:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send B2B User Account Pending message on WhatsApp
 * Used by b2bAdmin/update when status === 'pending'
 */
async function sendB2bAccountPending({ to, personName, reason }) {
  try {
    if (!to) {
      console.warn("[WhatsApp] No WhatsApp number found for account pending notification.");
      return { success: false, message: "No WhatsApp number" };
    }

    const message = `⏳ *PC TRAVELS - ACCOUNT STATUS: PENDING* ⏳
━━━━━━━━━━━━━━━━━━
Dear *${personName || "Valued Partner"}*,

Thank you for registering with *PC Travels*.
Your account is currently *PENDING APPROVAL* and under review by our verification team.

📌 *Status:* ${reason || "Awaiting admin approval."}

Once your account is approved, you will receive confirmation with your login credentials.
📞 *Support Team:* +91 98269 53206

*Team PC Travels*`;

    return await sendTextMessage(to, message);
  } catch (error) {
    console.error("[WhatsApp] Error sending account pending message:", error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  formatPhoneNumber,
  formatDate,
  sendTextMessage,
  sendTemplateMessage,
  sendDriverTransportDetails,
  sendB2bAccountActivated,
  sendB2bAccountHold,
  sendB2bAccountPending,
};

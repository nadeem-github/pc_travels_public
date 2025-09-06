const { User, B2bUser } = require('@models');
const { to, ReE } = require('@services/util.service');

let checkUser = async function (req, res, next) {
    let user, err;
    [err, user] = await to(User.findOne({
        where: { id: req.user.id },
        attributes: [
            'id', 'username', 'password'
        ],
    }));
    if (!user) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    user = req.user;
    next();
}
let adminUser = async function (req, res, next) {
    let user, err;
    [err, user] = await to(User.findOne({
        where: { id: req.user.id },
        attributes: [
            'id', 'username', 'password'
        ],
    }));
    if (!user) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    user = req.user;
    next();
}
let b2bUser = async function (req, res, next) {
    let b2buser, err;
    [err, b2buser] = await to(B2bUser.findOne({
        where: { id: req.user.id, status: "complete" },

    }));
    if (!b2buser) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    b2buser = req.b2buser;
    next();
}
module.exports.checkUser = checkUser;
module.exports.adminUser = adminUser;
module.exports.b2bUser = b2bUser;
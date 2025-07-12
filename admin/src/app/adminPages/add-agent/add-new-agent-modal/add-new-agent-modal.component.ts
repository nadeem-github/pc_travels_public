import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-agent-modal',
  templateUrl: './add-new-agent-modal.component.html',
  styleUrls: ['./add-new-agent-modal.component.scss']
})
export class AddNewAgentModalComponent {
  @Input() agentData: any; // agar edit ho to data ayega
  agentForm!: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;
  agentPhotoFile!: File;

  imgBaseURL = environment.imgBaseURL;

  showToast = false;
  toastMessage = '';
  toastClass = 'bg-success';


  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private agentService: AdminApisService,
  ) { }

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      id: [this.agentData?.id || null],
      agent_area: [this.agentData?.agent_area || '', Validators.required],
      agent_name: [this.agentData?.agent_name || '', Validators.required],
      agent_number: [this.agentData?.agent_number || '', Validators.required],
      agent_email: [this.agentData?.agent_email || '', [Validators.required, Validators.email]],
      agent_address: [this.agentData?.agent_address || '', Validators.required],
      agent_photo: [null]
    });

    if (this.agentData?.agent_photo) {
      this.photoPreview = `${this.imgBaseURL + this.agentData.agent_photo}`;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.agentPhotoFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.photoPreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.agentForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.agentForm.value).forEach(key => {
      if (this.agentForm.value[key] !== null) {
        formData.append(key, this.agentForm.value[key]);
      }
    });

    if (this.agentPhotoFile) {
      formData.append('agent_photo', this.agentPhotoFile);
    }

    const request = this.agentForm.value.id
      ? this.agentService.agentUpdate(formData)
      : this.agentService.agentCreate(formData);

    request.subscribe({
      next: (res) => {
        this.showToastMessage(res.message || 'Agent saved successfully.', 'success');
        setTimeout(() => this.activeModal.close('refresh'), 1000);
      },
      error: (err) => {
        this.showToastMessage('Something went wrong while saving the agent.', 'danger');
      }
    });

  }

  showToastMessage(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-success' : 'bg-danger';
    this.showToast = true;
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-package-modal',
  templateUrl: './add-package-modal.component.html',
  styleUrls: ['./add-package-modal.component.scss']
})
export class AddPackageModalComponent {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() packageData: any;

  packageForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSubmitting = false;
  imgBaseURL = environment.imgBaseURL;

  // Toast state
  toastMessage: string = '';
  toastClass: string = '';
  showToast: boolean = false;

  packageNames: string[] = [
    'Holiday Package',
    'Umrah Package',
    'Land Package',
    'Hajj Package'
  ];

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private service: AdminApisService
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.packageData) {
      this.packageForm.patchValue({
        name: this.packageData.name,
        title: this.packageData.title,
        description: this.packageData.description,
        price: this.packageData.price,
        hotel1: this.packageData.hotel1,
        hotel1_price: this.packageData.hotel1_price,
        hotel2: this.packageData.hotel2,
        hotel2_price: this.packageData.hotel2_price
      });

      if (this.packageData.package_image) {
        this.imagePreview = this.imgBaseURL + this.packageData.package_image;
      }
    }
  }

  initForm(): void {
    this.packageForm = this.fb.group({
      name: ['',],
      title: ['',],
      description: [''],
      price: ['',],
      hotel1: ['',],
      hotel1_price: ['',],
      hotel2: ['',],
      hotel2_price: ['',],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.packageForm.invalid) {
      this.packageForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const values = this.packageForm.value;

    if (this.mode === 'edit') {
      formData.append('id', this.packageData.id);
    }

    for (let key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }

    if (this.selectedFile) {
      formData.append('package_image', this.selectedFile);
    }

    this.isSubmitting = true;

    const request = this.mode === 'edit'
      ? this.service.packagesUpdate(formData)
      : this.service.packagesCreate(formData);

    request.subscribe({
      next: () => {
        this.showToastMessage(
          this.mode === 'edit' ? 'Package updated successfully.' : 'Package created successfully.',
          'bg-success text-light'
        );
        setTimeout(() => {
          this.modalRef.close('refresh');
        }, 1500);
      },
      error: () => {
        this.showToastMessage('Something went wrong. Please try again.', 'bg-danger text-light');
        this.isSubmitting = false;
      }
    });
  }

  showToastMessage(message: string, toastClass: string) {
    this.toastMessage = message;
    this.toastClass = toastClass;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

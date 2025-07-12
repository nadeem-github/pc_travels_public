import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us-add-modal',
  templateUrl: './about-us-add-modal.component.html',
  styleUrls: ['./about-us-add-modal.component.scss']
})
export class AboutUsAddModalComponent {
  @Input() editMode: boolean = false;
  @Input() aboutId!: number;

  aboutUsForm: FormGroup;
  selectedImages: { [key: string]: File | null } = {
    about_image_1: null,
    about_image_2: null,
    about_image_3: null,
  };
  previewImages: { [key: string]: string | ArrayBuffer | null } = {};

  isLoading = false;
  toastMessage: string | null = null;
  toastType: 'success' | 'danger' = 'success';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private aboutUsService: AdminApisService
  ) {
    this.aboutUsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.editMode && this.aboutId) {
      this.loadAboutUsData(this.aboutId);
    }
  }

  loadAboutUsData(id: number): void {
    this.isLoading = true;
    this.aboutUsService.fetchAboutsUsById(id).subscribe({
      next: (res) => {
        const data = res.data;
        this.aboutUsForm.patchValue({
          title: data.title,
          description: data.description,
        });

        // Preview existing images
        ['about_image_1', 'about_image_2', 'about_image_3'].forEach((key) => {
          if (data[key]) {
            this.previewImages[key] = `${environment.imgBaseURL}${data[key]}`;
          }
        });

        this.isLoading = false;
      },
      error: () => {
        this.showToast('Failed to load data', 'danger');
        this.isLoading = false;
      }
    });
  }

  onFileChange(event: Event, key: string): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImages[key] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages[key] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.aboutUsForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.aboutUsForm.value.title);
    formData.append('description', this.aboutUsForm.value.description);

    Object.entries(this.selectedImages).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    if (this.editMode && this.aboutId) {
      formData.append('id', this.aboutId.toString());
      this.isLoading = true;
      this.aboutUsService.updateAboutsUs(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.showToast('About Us updated successfully', 'success');
          setTimeout(() => this.activeModal.close('refresh'), 1000);
        },
        error: () => {
          this.isLoading = false;
          this.showToast('Something went wrong', 'danger');
        }
      });
    } else {
      this.isLoading = true;
      this.aboutUsService.addAboutsUs(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.showToast('About Us created successfully', 'success');
          setTimeout(() => this.activeModal.close('refresh'), 1000);
        },
        error: () => {
          this.isLoading = false;
          this.showToast('Something went wrong', 'danger');
        }
      });
    }
  }

  showToast(msg: string, type: 'success' | 'danger' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => this.toastMessage = null, 3000);
  }

}

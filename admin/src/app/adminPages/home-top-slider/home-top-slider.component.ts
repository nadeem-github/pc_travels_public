import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-top-slider',
  templateUrl: './home-top-slider.component.html',
  styleUrls: ['./home-top-slider.component.scss']
})
export class HomeTopSliderComponent {
  sliders: any[] = [];
  isLoading: boolean = true;
  imgBaseURL = environment.imgBaseURL;
  defaultImage = environment.defaultSlide;

  addSlideForm!: FormGroup;
  selectedImageFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isSubmitting = false;

  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  selectedSlideId: number | null = null;
  isEditMode = false;
  sliderModalRef: any;

  selectedSlideToDelete: number | null = null;

  constructor(
    private sliderService: AdminApisService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getSliders();
    this.initForm();
  }

  getSliders(): void {
    this.sliderService.fetchSliders().subscribe({
      next: (response) => {
        this.sliders = response.data?.rows || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.addSlideForm = this.fb.group({
      name: ['',],
      slider_image: [null]
    });
  }

  openAddModal(content: TemplateRef<any>) {
    this.resetForm();
    this.sliderModalRef = this.modalService.open(content, { centered: true, size: 'md' });
  }

  onEdit(slideId: number, content: TemplateRef<any>) {
    this.sliderService.fetchSingleSlide(slideId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.selectedSlideId = res.data.id;
          this.isEditMode = true;
          this.addSlideForm.patchValue({ name: res.data.name });
          this.previewImage = this.imgBaseURL + res.data.slider_image;
          this.sliderModalRef = this.modalService.open(content, { centered: true, size: 'md' });
        } else {
          this.showToast('Slide not found', 'error');
        }
      },
      error: () => {
        this.showToast('Error fetching slide data', 'error');
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewImage = reader.result;
      reader.readAsDataURL(file);
      this.addSlideForm.patchValue({ slider_image: file });
    }
  }

  submitSlide(modalRef: any) {
    if (this.addSlideForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.addSlideForm.get('name')?.value);

    if (this.selectedImageFile) {
      formData.append('slider_image', this.selectedImageFile);
    }

    this.isSubmitting = true;

    if (this.isEditMode && this.selectedSlideId) {
      formData.append('id', this.selectedSlideId.toString());
      this.sliderService.updateSlider(formData).subscribe({
        next: (res) => this.handleResponse(res, modalRef),
        error: () => {
          this.showToast('Server error', 'error');
          this.isSubmitting = false;
        }
      });
    } else {
      this.sliderService.createSlider(formData).subscribe({
        next: (res) => this.handleResponse(res, modalRef),
        error: () => {
          this.showToast('Server error', 'error');
          this.isSubmitting = false;
        }
      });
    }
  }

  handleResponse(res: any, modalRef: any) {
    if (res.success) {
      this.showToast(res.message, 'success');
      modalRef.close();
      this.getSliders();
    } else {
      this.showToast(res.message || 'Something went wrong', 'error');
    }
    this.isSubmitting = false;
    this.resetForm();
  }

  resetForm() {
    this.addSlideForm.reset();
    this.previewImage = null;
    this.selectedImageFile = null;
    this.isEditMode = false;
    this.selectedSlideId = null;
  }

  onImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  openDeleteModal(content: TemplateRef<any>, slideId: number) {
    this.selectedSlideToDelete = slideId;
    this.modalService.open(content, { centered: true });
  }

  deleteSlide(modalRef: any) {
    if (!this.selectedSlideToDelete) return;
    const payload = { id: this.selectedSlideToDelete };
    this.sliderService.deleteSlider(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast(res.message, 'success');
          this.getSliders();
          modalRef.close();
        } else {
          this.showToast(res.message || 'Failed to delete slide', 'error');
        }
      },
      error: () => {
        this.showToast('Server error. Please try again.', 'error');
      }
    });
  }

}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-block-home-add-modal',
  templateUrl: './block-home-add-modal.component.html',
  styleUrls: ['./block-home-add-modal.component.scss']
})
export class BlockHomeAddModalComponent {
  @Input() editMode: boolean = false;
  @Input() blockId!: number;

  blockHomeForm: FormGroup;
  selectedImage: File | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;
  loading = false;

  toastMessage: string | null = null;
  toastType: 'success' | 'danger' = 'success';
  isLoading: boolean = false;

  existingImage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private blockHomeService: AdminApisService
  ) {
    this.blockHomeForm = this.fb.group({
      title: ['',],
      description: ['',],
      block_home_image: [null,]
    });
  }

  ngOnInit(): void {
    if (this.editMode && this.blockId) {
      this.loadSingleBlockData(this.blockId);
    }
  }

  loadSingleBlockData(id: number): void {
    this.blockHomeService.fetchSingleBlock(id).subscribe(res => {
      const data = res.data;
      this.blockHomeForm.patchValue({
        description: data.description,
        title: data.title
      });

      this.existingImage = data.block_home_image; // ✅ Save original image name
      this.previewImageUrl = environment.imgBaseURL + data.block_home_image;
    });
  }


  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImage = file;
      this.blockHomeForm.patchValue({ block_home_image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.blockHomeForm.invalid) return;

    const formData = new FormData();
    formData.append('description', this.blockHomeForm.value.description);
    formData.append('title', this.blockHomeForm.value.title);

    if (this.selectedImage) {
      formData.append('block_home_image', this.selectedImage);
    } else if (this.editMode && this.existingImage) {
      // ✅ Important: Send previous image name if not replaced
      formData.append('existing_image', this.existingImage);
    }

    if (this.editMode) {
      formData.append('id', this.blockId.toString());
      this.isLoading = true;
      this.blockHomeService.updateBlockHome(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.showToast('Block Home saved successfully', 'success');
          setTimeout(() => this.activeModal.close('refresh'), 1000);
        },
        error: (err) => {
          this.isLoading = false;
          this.showToast('Something went wrong', 'danger');
        }
      });
    } else {
      this.isLoading = true;
      this.blockHomeService.createBlockHome(formData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.showToast('Block Home saved successfully', 'success');
          setTimeout(() => this.activeModal.close('refresh'), 1000);
        },
        error: (err) => {
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

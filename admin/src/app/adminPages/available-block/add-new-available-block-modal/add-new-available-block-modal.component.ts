import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-available-block-modal',
  templateUrl: './add-new-available-block-modal.component.html',
  styleUrls: ['./add-new-available-block-modal.component.scss']
})
export class AddNewAvailableBlockModalComponent {

  @Input() blockId: number | null = null;
  modalTitle: string = 'Add New Block';
  blockForm: FormGroup;
  isSubmitting = false;
  toastMessage: string | null = null;
  toastType: string = 'success';
  imagePreviews: string[] = [null!, null!, null!];
  selectedImages: File[] = [];

  imgBaseURL = environment.imgBaseURL;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private adminService: AdminApisService
  ) {
    this.blockForm = this.fb.group({
      blocks: this.fb.array([this.createBlockGroup()])
    });
  }

  ngOnInit(): void {
    if (this.blockId) {
      this.modalTitle = 'Edit Block';
      this.fetchBlock(this.blockId);
    }
  }

  createFieldArray(): FormArray {
    return this.fb.array([
      this.fb.group({ value: [''] })
    ]);
  }

  createImageFieldArray(): FormArray {
    return this.fb.array([
      this.fb.group({ file: [null] })
    ]);
  }

  createBlockGroup(): FormGroup {
    return this.fb.group({
      airline: this.createFieldArray(),
      flight_number: this.createFieldArray(),
      from_date: this.createFieldArray(),
      departure: this.createFieldArray(),
      departure_time: this.createFieldArray(),
      destination: this.createFieldArray(),
      destination_time: this.createFieldArray(),
      airline_image: this.createImageFieldArray(),
    });
  }

  getFieldControls(field: string): FormArray {
    return (this.blockForm.get('blocks') as FormArray).at(0).get(field) as FormArray;
  }

  addField(field: string): void {
    const controlArray = this.getFieldControls(field);
    if (field === 'airline_image') {
      if (controlArray.length < 4) controlArray.push(this.fb.group({ file: [null] }));
    } else {
      if (controlArray.length < 4) controlArray.push(this.fb.group({ value: [''] }));
    }
  }

  removeField(field: string, index: number): void {
    const controlArray = this.getFieldControls(field);
    if (controlArray.length > 1) {
      controlArray.removeAt(index);
      if (field === 'airline_image') {
        this.imagePreviews.splice(index, 1);
        this.selectedImages.splice(index, 1);
      }
    }
  }

  onImageSelect(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviews[index] = reader.result as string;
      };

      reader.readAsDataURL(file);
      this.selectedImages[index] = file;
    }
  }

  fetchBlock(id: number) {
    this.adminService.fetchAvailableBlockById(id).subscribe((res) => {
      const block = res.data;

      const fields = ['airline', 'flight_number', 'from_date', 'departure', 'departure_time', 'destination', 'destination_time', 'airline_image'];

      fields.forEach(field => {
        for (let i = 0; i < 4; i++) {
          const value = block[`${field}_${i + 1}`];
          if (value) {
            this.addField(field); // ensure field exists
            const control = this.getFieldControls(field).at(i);

            // 👇 Put the fix here:
            if (field === 'from_date' && value) {
              const formattedDate = new Date(value).toISOString().split('T')[0];
              control.get('value')?.setValue(formattedDate);
            } else if (field === 'airline_image') {
              this.imagePreviews[i] = value; // for preview
            } else {
              control.get('value')?.setValue(value);
            }
          }
        }
      });
    });
  }


  onSubmit(): void {
    if (this.blockForm.invalid) return;
    this.isSubmitting = true;
    const block = (this.blockForm.get('blocks') as FormArray).at(0);
    const payload: any = new FormData();

    const fields = [
      'airline',
      'flight_number',
      'from_date',
      'departure',
      'departure_time',
      'destination',
      'destination_time'
    ];

    fields.forEach(field => {
      const controlArray = block.get(field) as FormArray;
      controlArray.controls.forEach((ctrl, i) => {
        payload.append(`${field}_${i + 1}`, ctrl.get('value')?.value || '');
      });
    });

    const imageArray = block.get('airline_image') as FormArray;
    imageArray.controls.forEach((ctrl, i) => {
      const file = this.selectedImages[i];
      if (file) {
        payload.append(`airline_image_${i + 1}`, file);
      }
    });

    if (this.blockId) payload.append('id', this.blockId);

    const request = this.blockId
      ? this.adminService.updateAvailableBlock(payload)
      : this.adminService.addAvailableBlock(payload);

    request.subscribe({
      next: () => {
        this.toastType = 'success';
        this.toastMessage = `Block ${this.blockId ? 'updated' : 'created'} successfully.`;
        this.isSubmitting = false;
        // setTimeout(() => this.activeModal.close(true), 1500);
        setTimeout(() => this.activeModal.close('refresh'), 1500);
      },
      error: () => {
        this.toastType = 'danger';
        this.toastMessage = 'Something went wrong.';
        this.isSubmitting = false;
      }
    });
  }

}

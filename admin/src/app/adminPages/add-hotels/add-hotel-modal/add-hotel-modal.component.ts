import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-hotel-modal',
  templateUrl: './add-hotel-modal.component.html',
  styleUrls: ['./add-hotel-modal.component.scss']
})
export class AddHotelModalComponent {
  @Input() hotelId: number | null = null;

  hotelForm!: FormGroup;
  imageFields = ['hotel_image_1', 'hotel_image_2', 'hotel_image_3', 'hotel_image_4', 'hotel_image_5'];
  imagePreview: { [key: string]: string } = {};
  isEditMode = false;
  imgBaseURL = environment.imgBaseURL;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private hotelService: AdminApisService
  ) { }

  ngOnInit(): void {
    this.createHotelForm();
    if (this.hotelId) {
      this.isEditMode = true;
      this.loadHotelData();
    }
  }

  createHotelForm(data: any = null) {
    this.hotelForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      price: [data?.price || '', Validators.required],
      description: [data?.description || '', Validators.required]
    });

    this.imageFields.forEach(field => {
      if (data?.[field]) {
        this.imagePreview[field] = this.imgBaseURL + data[field];
      } else {
        this.imagePreview[field] = '';
      }
    });
  }

  loadHotelData() {
    this.hotelService.hotelfetchSingle(this.hotelId!).subscribe({
      next: (res) => {
        if (res.success) this.createHotelForm(res.data);
      },
      error: (err) => {
        console.error('Failed to fetch single hotel:', err);
      }
    });
  }

  onImageChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview[field] = reader.result as string);
      reader.readAsDataURL(file);
      this.hotelForm.addControl(field, new FormControl(file));
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.hotelForm.value.name);
    formData.append('price', this.hotelForm.value.price);
    formData.append('description', this.hotelForm.value.description);

    this.imageFields.forEach(field => {
      if (this.hotelForm.get(field)) {
        formData.append(field, this.hotelForm.get(field)!.value);
      }
    });

    if (this.isEditMode && this.hotelId) {
      formData.append('id', this.hotelId.toString());
      this.hotelService.hotelUpdate(formData).subscribe({
        next: (res) => {
          this.activeModal.close('refresh'); // 👈 important
        },
        error: (err) => {
          console.error('Hotel update error:', err);
          this.activeModal.dismiss('error');
        }
      });
    } else {
      this.hotelService.hotelCreate(formData).subscribe({
        next: (res) => {
          this.activeModal.close('refresh'); // 👈 important
        },
        error: (err) => {
          console.error('Hotel create error:', err);
          this.activeModal.dismiss('error');
        }
      });
    }
  }


  closeModal() {
    this.activeModal.dismiss();
  }
}

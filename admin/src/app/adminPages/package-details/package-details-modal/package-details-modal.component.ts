import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';

@Component({
  selector: 'app-package-details-modal',
  templateUrl: './package-details-modal.component.html',
  styleUrls: ['./package-details-modal.component.scss']
})
export class PackageDetailsModalComponent {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() packageId?: number;
  packageForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private packageService: AdminApisService,
    private modalRef: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.packageId) {
      this.packageService.packagedetailsfetchSingle(this.packageId).subscribe({
        next: (res) => {
          if (res.success) {
            const data = res.data;

            // Format ISO string to yyyy-MM-dd for date inputs
            const formatDate = (iso: string) => new Date(iso).toISOString().split('T')[0];

            this.packageForm.patchValue({
              title: data.title,
              price: data.price,
              days: data.days,
              departure_date: formatDate(data.departure_date),
              departure_location: data.departure_location,
              arrival_date: formatDate(data.arrival_date),
              arrival_location: data.arrival_location,
              airline: data.airline,
              hotel_distance_1: data.hotel_distance_1,
              hotel_distance_2: data.hotel_distance_2,
              hotel_distance_3: data.hotel_distance_3,
              description: data.description
            });
          }
        }
      });
    }
  }


  initForm(): void {
    this.packageForm = this.fb.group({
      title: ['',],
      price: ['',],
      days: ['',],
      departure_date: ['',],
      departure_location: ['',],
      arrival_date: ['',],
      arrival_location: ['',],
      airline: ['',],
      hotel_distance_1: [''],
      hotel_distance_2: [''],
      hotel_distance_3: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.packageForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.packageForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    this.isSubmitting = true;

    if (this.mode === 'add') {
      this.packageService.packagedetailsCreate(formData).subscribe({
        next: (res) => {
          this.modalRef.close('refresh');
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      formData.append('id', this.packageId!.toString());
      this.packageService.packagedetailsUpdate(formData).subscribe({
        next: (res) => {
          this.modalRef.close('refresh');
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  close(): void {
    this.modalRef.dismiss();
  }
}

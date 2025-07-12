import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-add-new-country-modal',
  templateUrl: './add-new-country-modal.component.html',
  styleUrls: ['./add-new-country-modal.component.scss']
})
export class AddNewCountryModalComponent {
  @Input() isEditMode: boolean = false;
  @Input() countryId!: number;
  visaForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private visaService: VisaService
  ) { }

  ngOnInit(): void {
    this.visaForm = this.fb.group({
      country: ['', Validators.required],
      processing_time: ['', Validators.required],
      starting_from_price: ['', Validators.required]
    });

    if (this.isEditMode && this.countryId) {
      this.visaService.visafetchSingle(this.countryId).subscribe((res) => {
        const visa = res.data;
        this.visaForm.patchValue({
          country: visa.country,
          processing_time: visa.processing_time,
          starting_from_price: visa.starting_from_price
        });
      });
    }
  }

  onSubmit() {
    if (this.visaForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.visaForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.isEditMode) {
      formData.append('id', this.countryId.toString());
      this.visaService.visaUpdate(formData).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.visaService.visaCreate(formData).subscribe(() => {
        this.activeModal.close();
      });
    }
  }
}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-add-country-visa-modal',
  templateUrl: './add-country-visa-modal.component.html',
  styleUrls: ['./add-country-visa-modal.component.scss']
})
export class AddCountryVisaModalComponent {
  @Input() isEditMode: boolean = false;
  @Input() visaId!: number;
  @Input() country!: string;
  visaForm!: FormGroup;

  // Define the fields used in both form and API
  visaFields = [
    'country',
    'visa_type',
    'processing_time',
    'stay_period',
    'validity',
    'entry',
    'fees',
    // 'starting_from_price',
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private visaService: VisaService
  ) { }

  ngOnInit(): void {
    // Create form controls dynamically
    const formGroupConfig: any = {};
    this.visaFields.forEach(field => {
      formGroupConfig[field] = ['', Validators.required];
    });
    this.visaForm = this.fb.group(formGroupConfig);

    // If in edit mode, fetch and patch data
    if (this.isEditMode && this.visaId) {
      this.visaService.visatypefetchSingle(this.visaId).subscribe((res) => {
        const visa = res.data;
        this.visaForm.patchValue(visa);
      });
    } else {
      // For add mode, patch default country value
      this.visaForm.patchValue({ country: this.country });
    }
  }


  onSubmit() {
    if (this.visaForm.invalid) return;

    const formData = new FormData();
    this.visaFields.forEach(field => {
      formData.append(field, this.visaForm.get(field)?.value);
    });

    if (this.isEditMode) {
      formData.append('id', this.visaId.toString());
      this.visaService.visatypeUpdate(formData).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.visaService.visatypeCreate(formData).subscribe(() => {
        this.activeModal.close();
      });
    }
  }

}

import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-add-visa-documents',
  templateUrl: './add-visa-documents.component.html',
  styleUrls: ['./add-visa-documents.component.scss']
})
export class AddVisaDocumentsComponent {

  @Input() country!: string;
  @Input() editId?: number;

  visaDocForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private visaService: VisaService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.visaDocForm = this.fb.group({
      visa_document: ['', Validators.required],
      notes: [''],
      description: [''],
      docs: this.fb.array([this.fb.control('', Validators.required)])
    });

    if (this.editId) {
      this.loadVisaDocument();
    }
  }

  get docs(): FormArray {
    return this.visaDocForm.get('docs') as FormArray;
  }

  addDocumentField() {
    this.docs.push(this.fb.control('', Validators.required));
  }

  removeDocumentField(index: number) {
    if (this.docs.length > 1) {
      this.docs.removeAt(index);
    }
  }

  loadVisaDocument() {
    this.visaService.visaDocumentfetchSingle(this.editId!).subscribe(res => {
      const data = res.data;
      if (data) {
        this.visaDocForm.patchValue({
          visa_document: data.visa_document,
          notes: data.notes,
          description: data.description
        });

        // Clear existing and populate docs
        this.docs.clear();
        for (let i = 1; i <= 40; i++) {
          const value = data[`doc_${i}`];
          if (value) {
            this.docs.push(this.fb.control(value, Validators.required));
          }
        }
      }
    });
  }

  onSubmit() {
    if (this.visaDocForm.invalid) return;

    const payload = new FormData();
    payload.append('country', this.country);
    payload.append('visa_document', this.visaDocForm.value.visa_document);
    payload.append('notes', this.visaDocForm.value.notes);
    payload.append('description', this.visaDocForm.value.description);

    this.visaDocForm.value.docs.forEach((val: string, i: number) => {
      payload.append(`doc_${i + 1}`, val);
    });

    if (this.editId) {
      payload.append('id', this.editId.toString());
      this.visaService.visaDocumentUpdate(payload).subscribe(() => this.activeModal.close());
    } else {
      this.visaService.visaDocumentCreate(payload).subscribe(() => this.activeModal.close());
    }
  }

}

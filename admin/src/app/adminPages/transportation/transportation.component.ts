import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;
  @ViewChild('pdfModal') pdfModal!: TemplateRef<any>;

  form!: FormGroup;
  modalRef!: NgbModalRef;
  data: any = null;
  previewUrl: string = '';
  selectedFile!: File;
  isEditMode = false;
  loading = false;
  toast = { show: false, message: '', type: 'success' };
  deleteId!: number;

  pdfFile!: File;
  pdfFileName: string = '';
  safePdfUrl!: SafeResourceUrl;



  imgBaseURL = environment.imgBaseURL;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private parallaxService: AdminApisService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { show: true, message, type };
  }

  fetchData() {
    this.loading = true;
    this.parallaxService.transportationFetch().subscribe({
      next: res => this.data = res.data.rows[0],
      error: () => this.showToast('Fetch failed', 'error'),
      complete: () => this.loading = false
    });
  }

  openModal(mode: 'add' | 'edit', id?: number) {
    this.isEditMode = mode === 'edit';
    this.form.reset();
    this.previewUrl = '';
    if (this.isEditMode && id) {
      this.parallaxService.transportationfetchSingle(id).subscribe({
        next: res => {
          const item = res.data;
          this.form.patchValue(item);
          this.previewUrl = this.imgBaseURL + item.transport_image_1;
        },
        error: () => this.showToast('Failed to fetch single entry', 'error')
      });
    }
    this.modalRef = this.modalService.open(this.modalContent, { centered: true, size: 'lg' });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrl = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onPdfFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfFile = event.target.files[0];
      this.pdfFileName = this.pdfFile.name;
    }
  }

  submit(modal: NgbModalRef) {
    const formData = new FormData();
    const values = this.form.value;

    formData.append('id', values.id); // Required in edit mode
    formData.append('name', values.name);
    formData.append('description', values.description);

    if (this.selectedFile) {
      formData.append('transport_image_1', this.selectedFile);
    }

    if (this.pdfFile) {
      formData.append('transport_pdf_image', this.pdfFile);
    }

    const request = this.isEditMode
      ? this.parallaxService.transportationUpdate(formData)
      : this.parallaxService.transportationCreate(formData);

    request.subscribe({
      next: () => {
        this.showToast(this.isEditMode ? 'Updated successfully' : 'Created successfully');
        modal.close();
        this.fetchData();
      },
      error: () => this.showToast('Save failed', 'error')
    });
  }


  isPdf(fileUrl: string): boolean {
    return fileUrl?.toLowerCase().endsWith('.pdf');
  }

  openPdfModal(modalTemplate: TemplateRef<any>) {
    const pdfFullUrl = this.imgBaseURL + this.data.transport_pdf_image;
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfFullUrl);
    this.modalService.open(modalTemplate, { size: 'lg', centered: true });
  }



  confirmDelete(id: number) {
    this.deleteId = id;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }

  deleteConfirmed(modal: NgbModalRef) {
    this.loading = true;
    this.parallaxService.transportationDelete(this.deleteId).subscribe({
      next: () => {
        this.showToast('Deleted successfully');
        this.data = null;
        modal.close();
      },
      error: () => {
        this.showToast('Delete failed', 'error');
        modal.dismiss();
      },
      complete: () => this.loading = false
    });
  }
}

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-visa-home',
  templateUrl: './work-visa-home.component.html',
  styleUrls: ['./work-visa-home.component.scss']
})
export class WorkVisaHomeComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;

  form!: FormGroup;
  modalRef!: NgbModalRef;
  data: any = null;
  previewUrl: string = '';
  selectedFile!: File;
  isEditMode = false;
  loading = false;
  toast = { show: false, message: '', type: 'success' };
  deleteId!: number;

  imgBaseURL = environment.imgBaseURL;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private parallaxService: AdminApisService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fetchData();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description1: ['', Validators.required],
      description2: ['', Validators.required]
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { show: true, message, type };
  }

  fetchData() {
    this.loading = true;
    this.parallaxService.workvisaFetch().subscribe({
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
      this.parallaxService.workvisafetchSingle(id).subscribe({
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

  submit(modal: NgbModalRef) {
    const formData = new FormData();
    const values = this.form.value;

    if (this.selectedFile) {
      formData.append('transport_image_1', this.selectedFile);
    }

    formData.append('title', values.title);
    formData.append('description1', values.description1);
    formData.append('description2', values.description2);

    const request = this.isEditMode
      ? this.parallaxService.workvisaUpdate({ ...values, transport_image_1: this.selectedFile })
      : this.parallaxService.workvisaCreate(formData);

    request.subscribe({
      next: () => {
        this.showToast(this.isEditMode ? 'Updated successfully' : 'Created successfully');
        modal.close();
        this.fetchData();
      },
      error: () => this.showToast('Save failed', 'error')
    });
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }

  deleteConfirmed(modal: NgbModalRef) {
    this.loading = true;
    this.parallaxService.workvisaDelete(this.deleteId).subscribe({
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

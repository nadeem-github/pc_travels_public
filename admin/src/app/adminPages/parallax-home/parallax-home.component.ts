import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parallax-home',
  templateUrl: './parallax-home.component.html',
  styleUrls: ['./parallax-home.component.scss']
})
export class ParallaxHomeComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;
  form!: FormGroup;
  modalRef!: NgbModalRef;
  data: any = null;
  previewUrl: any = '';
  selectedFile!: File;
  isEditMode = false;
  toast = { show: false, message: '', type: 'success' };
  loading = false;
  deleteId!: number;

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { show: true, message, type };
  }

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
      description2: ['', Validators.required],
    });
  }

  fetchData() {
    this.loading = true;
    this.parallaxService.parallaxFetch().subscribe({
      next: res => { this.data = res.data[0]; },
      error: err => this.showToast('Fetch failed', 'error'),
      complete: () => this.loading = false
    });
  }

  openModal(mode: 'add' | 'edit', item?: any) {
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && item) {
      this.form.patchValue(item);
      this.previewUrl = this.imgBaseURL + item.parallax_image;
    } else {
      this.form.reset();
      this.previewUrl = '';
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

  submit(modal: any) {
    const formData = new FormData();
    const values = this.form.value;
    if (this.selectedFile) {
      formData.append('parallax_image', this.selectedFile);
    }
    formData.append('title', values.title);
    formData.append('description1', values.description1);
    formData.append('description2', values.description2);
    if (this.isEditMode) {
      formData.append('id', values.id);
      this.parallaxService.parallaxUpdate(formData).subscribe(() => {
        this.fetchData();
        modal.close();
      });
    } else {
      this.parallaxService.parallaxCreate(formData).subscribe(() => {
        this.fetchData();
        modal.close();
      });
    }
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }

  deleteConfirmed(modal: NgbModalRef) {
    this.loading = true;

    this.parallaxService.parallaxDelete(this.deleteId).subscribe({
      next: (res) => {
        this.showToast('Parallax content deleted successfully.', 'success');
        this.data = null; // or refetch the list if needed
        modal.close();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Failed to delete Parallax content.', 'error');
        modal.dismiss();
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


}

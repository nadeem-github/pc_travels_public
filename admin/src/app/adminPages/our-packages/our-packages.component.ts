import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';
import { AddPackageModalComponent } from './add-package-modal/add-package-modal.component';

@Component({
  selector: 'app-our-packages',
  templateUrl: './our-packages.component.html',
  styleUrls: ['./our-packages.component.scss']
})
export class OurPackagesComponent {

  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;

  deleteId: number | null = null;
  deleteName: string = '';

  expandedHotels: Set<number> = new Set();

  packages: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'danger' = 'success';

  toastClass: string = 'bg-success';


  imgBaseURL = environment.imgBaseURL;

  constructor(
    private service: AdminApisService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.isLoading = true;
    this.service.packagesFetch().subscribe({
      next: (res) => {
        if (res?.data?.rows) {
          this.packages = res.data.rows;
        } else {
          this.errorMessage = 'No data found';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong';
        this.isLoading = false;
      }
    });
  }

  openDeleteModal(id: number, name: string) {
    this.deleteId = id;
    this.deleteName = name;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }

  confirmDelete(modalRef: any) {
    if (this.deleteId) {
      this.service.packagesDelete(this.deleteId).subscribe({
        next: (res) => {
          this.fetchPackages();
          this.toastMessage = res?.message || 'Package deleted successfully.';
          this.toastType = 'success';
          this.showToast = true;
          modalRef.close();
        },
        error: (err) => {
          this.toastMessage = 'Failed to delete package.';
          this.toastType = 'danger';
          this.showToast = true;
          modalRef.dismiss();
        },
      });
    }
  }

  openAddModal() {
    const modalRef = this.modalService.open(AddPackageModalComponent, { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then(
      (result) => {
        if (result === 'refresh') {
          this.fetchPackages();

          this.toastMessage = 'Package created successfully.';
          this.toastClass = 'bg-success';
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        }
      },
      () => { /* dismissed */ }
    );
  }


  editPackage(id: number) {
    this.service.packagesfetchSingle(id).subscribe({
      next: (res) => {
        if (res?.data) {
          const modalRef = this.modalService.open(AddPackageModalComponent, { size: 'lg', backdrop: 'static' });
          modalRef.componentInstance.mode = 'edit';
          modalRef.componentInstance.packageData = res.data;

          modalRef.result.then(
            (result) => {
              if (result === 'refresh') {
                this.fetchPackages();

                // Show Toast
                this.toastMessage = 'Package updated successfully.';
                this.toastClass = 'bg-success';
                this.showToast = true;
                setTimeout(() => this.showToast = false, 3000);
              }
            },
            () => { /* dismissed */ }
          );
        }
      },
      error: () => {
        this.toastMessage = 'Something went wrong while fetching package data.';
        this.toastClass = 'bg-danger';
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
      }
    });
  }

  toggleReadMore(id: number) {
    this.expandedHotels.has(id)
      ? this.expandedHotels.delete(id)
      : this.expandedHotels.add(id);
  }

  isExpanded(id: number): boolean {
    return this.expandedHotels.has(id);
  }


}

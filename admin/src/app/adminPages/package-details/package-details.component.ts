import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { PackageDetailsModalComponent } from './package-details-modal/package-details-modal.component';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent {

  @ViewChild('confirmDeleteModal') confirmDeleteModal: any;

  packageList: any[] = [];
  isLoading = false;
  selectedPackageId!: number;

  constructor(
    private packageService: AdminApisService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.isLoading = true;
    this.packageService.packagedetailsFetch().subscribe({
      next: (res) => {
        if (res.success) {
          this.packageList = res.data;
        }
        this.isLoading = false;
      },
      error: () => {
        // this.toastr.error('Something went wrong while fetching package details');
        this.isLoading = false;
      }
    });
  }

  openAddModal(): void {
    const modalRef = this.modalService.open(PackageDetailsModalComponent, { size: 'lg' });
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then((result) => {
      if (result === 'refresh') {
        this.fetchPackages();
      }
    });
  }

  openEditModal(id: number): void {
    const modalRef = this.modalService.open(PackageDetailsModalComponent, { size: 'lg' });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.packageId = id;

    modalRef.result.then((result) => {
      if (result === 'refresh') {
        this.fetchPackages();
      }
    });
  }

  confirmDelete(id: number): void {
    this.selectedPackageId = id;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }


  deletePackage(): void {
    this.packageService.packagedetailsDelete(this.selectedPackageId).subscribe({
      next: (res) => {
        if (res.success) {
          this.fetchPackages();
        } else {
        }
        this.modalService.dismissAll();
      },
      error: () => {
        this.modalService.dismissAll();
      }
    });
  }
}

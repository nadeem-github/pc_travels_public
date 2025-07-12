import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';
import { AboutUsAddModalComponent } from './about-us-add-modal/about-us-add-modal.component';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent {
  @ViewChild('deleteConfirm', { static: true }) deleteConfirmModal!: TemplateRef<any>;
  deleteId!: number;

  blockData: any = null;
  imgBaseURL = environment.imgBaseURL;

  toastMessage: string | null = null;
  toastType: 'success' | 'danger' = 'success';
  isLoading: boolean = false;

  constructor(
    private blockHomeService: AdminApisService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getBlockHomeData();
  }

  getBlockHomeData(): void {
    this.isLoading = true; // optional if loader add kar rahe
    this.blockHomeService.fetchAboutsUs().subscribe({
      next: (res) => {
        if (res?.data?.length) {
          this.blockData = res.data[0];
        } else {
          this.blockData = null; // ✅ clear the UI if nothing is returned
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching block home:', err);
        this.blockData = null;
        this.isLoading = false;
      }
    });
  }


  openAddModal(): void {
    const modalRef = this.modalService.open(AboutUsAddModalComponent, { size: 'lg', centered: true, });

    modalRef.closed.subscribe((result) => {
      if (result === 'refresh') {
        this.getBlockHomeData(); // reload data after add
      }
    });
  }

  onEdit(block: any): void {
    const modalRef = this.modalService.open(AboutUsAddModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.aboutId = block.id;  // ✅ Correct Input name

    modalRef.closed.subscribe(result => {
      if (result === 'refresh') {
        this.getBlockHomeData();  // Refresh after edit
      }
    });
  }

  onDelete(id: number): void {
    this.deleteId = id;
    this.modalService.open(this.deleteConfirmModal, { centered: true });
  }

  confirmDelete(modalRef: NgbModalRef): void {
    this.blockHomeService.deleteAboutsUs(this.deleteId).subscribe({
      next: () => {
        modalRef.close();
        this.showToast('Block content deleted successfully.', 'success');
        this.getBlockHomeData();
      },
      error: () => {
        modalRef.close();
        this.showToast('Failed to delete record', 'danger');
      }
    });
  }


  showToast(msg: string, type: 'success' | 'danger' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => this.toastMessage = null, 3000);
  }
}

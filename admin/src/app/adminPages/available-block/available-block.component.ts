import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AddNewAvailableBlockModalComponent } from './add-new-available-block-modal/add-new-available-block-modal.component';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-available-block',
  templateUrl: './available-block.component.html',
  styleUrls: ['./available-block.component.scss']
})
export class AvailableBlockComponent {

  blockList: any[] = [];
  isLoading = false;

  toastMessage: string | null = null;
  toastType: 'success' | 'danger' = 'success';
  imgBaseURL = environment.imgBaseURL;

  selectedBlock: any = null; // Block to delete

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  constructor(
    private blockHomeService: AdminApisService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadAvailableBlocks();
  }

  loadAvailableBlocks() {
    this.isLoading = true;
    this.blockHomeService.fetchAvailableBlocks().subscribe({
      next: (res) => {
        this.blockList = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading = false;
      }
    });
  }

  openEditModal(block: any): void {
    const modalRef = this.modalService.open(AddNewAvailableBlockModalComponent, { size: 'xl', centered: true, backdrop: 'static', scrollable: true });
    modalRef.componentInstance.blockId = block.id;
    modalRef.closed.subscribe((result) => {
      if (result === 'refresh') {
        this.loadAvailableBlocks();
      }
    });
  }


  openDeleteModal(block: any) {
    this.selectedBlock = block;
    this.modalService.open(this.deleteModal, { centered: true });
  }

  confirmDelete(modalRef: NgbModalRef) {
    this.blockHomeService.deleteAvailableBlock(this.selectedBlock.id).subscribe({
      next: (res) => {
        this.showToast('Block deleted successfully!', 'success');
        this.loadAvailableBlocks();
        modalRef.close();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Something went wrong. Try again.', 'danger');
        modalRef.close();
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  openAddModal(): void {
    const modalRef = this.modalService.open(AddNewAvailableBlockModalComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      scrollable: true
    });

    modalRef.result.then(
      (result) => {
        if (result === 'refresh') {
          this.loadAvailableBlocks(); // 👈 refresh after successful add
        }
      },
      () => { }
    );
  }

  showToast(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => (this.toastMessage = null), 3000);
  }

}

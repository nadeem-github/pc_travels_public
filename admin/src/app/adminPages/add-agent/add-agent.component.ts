import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';
import { AddNewAgentModalComponent } from './add-new-agent-modal/add-new-agent-modal.component';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent {

  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;

  deleteId: number | null = null;
  deleteName: string = '';

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
    this.service.agentFetch().subscribe({
      next: (res) => {
        if (res?.data) {
          this.packages = res.data;
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
      this.service.agentDelete(this.deleteId).subscribe({
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
    const modalRef = this.modalService.open(AddNewAgentModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then((result) => {
      if (result === 'refresh') {
        this.fetchPackages();
        this.showToastMessage('Agent created successfully.', 'success');
      }
    });
  }

  editPackage(id: number) {
    this.service.agentfetchSingle(id).subscribe({
      next: (res) => {
        const modalRef = this.modalService.open(AddNewAgentModalComponent, {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        });

        modalRef.componentInstance.agentData = res.data; // ✅ IMPORTANT
        modalRef.result.then((result) => {
          if (result === 'refresh') {
            this.fetchPackages();
            this.showToastMessage('Agent updated successfully.', 'success');
          }
        });
      },
      error: () => {
        this.showToastMessage('Failed to fetch agent details.', 'danger');
      }
    });
  }

  showToastMessage(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-success' : 'bg-danger';
    this.showToast = true;
  }

}

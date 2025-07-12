import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApisService } from 'src/app/services/admin-apis.service';
import { environment } from 'src/environments/environment';
import { AddHotelModalComponent } from './add-hotel-modal/add-hotel-modal.component';

@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.scss']
})
export class AddHotelsComponent {

  hotelList: any[] = [];
  loading = false;
  expandedHotels: Set<number> = new Set();
  imgBaseURL = environment.imgBaseURL;
  defaultImage = 'assets/images/defualtSlide.png';
  selectedHotelId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'danger' | 'warning' = 'success';

  constructor(
    private hotelService: AdminApisService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels() {
    this.loading = true;
    this.hotelService.hotelFetch().subscribe({
      next: (res) => {
        if (res.success) this.hotelList = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Hotel Fetch Error:', err);
        this.loading = false;
      }
    });
  }

  getHotelImages(hotel: any): string[] {
    const images = [
      hotel.hotel_image_1,
      hotel.hotel_image_2,
      hotel.hotel_image_3,
      hotel.hotel_image_4,
      hotel.hotel_image_5
    ]
      .filter(img => !!img)
      .map(img => this.imgBaseURL + img);

    return images.length > 0 ? images : [this.defaultImage];
  }

  toggleReadMore(id: number) {
    this.expandedHotels.has(id)
      ? this.expandedHotels.delete(id)
      : this.expandedHotels.add(id);
  }

  isExpanded(id: number): boolean {
    return this.expandedHotels.has(id);
  }

  openHotelModal(): void {
    this.selectedHotelId = null; // 👈 clear this on add
    const modalRef = this.modalService.open(AddHotelModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then(
      (result) => {
        if (result === 'refresh') {
          this.fetchHotels();
          this.showToast('Hotel added successfully.', 'success');
        }
      },
      () => { }
    );
  }

  openDeleteModal(id: number, content: TemplateRef<any>) {
    this.selectedHotelId = id;
    this.modalService.open(content, { centered: true });
  }

  confirmDelete(modalRef: any) {
    if (this.selectedHotelId) {
      this.hotelService.hotelDelete(this.selectedHotelId).subscribe({
        next: (res) => {
          if (res.success) {
            this.showToast('Hotel deleted successfully.', 'success');
            this.fetchHotels();
          } else {
            this.showToast(res.message || 'Delete failed.', 'danger');
          }
          modalRef.close();
        },
        error: (err) => {
          console.error('Delete Error:', err);
          this.showToast('Something went wrong!', 'danger');
          modalRef.close();
        }
      });
    }
  }

  openEditHotelModal(hotelId: number) {
    this.selectedHotelId = hotelId; // 👈 set this before modal open
    const modalRef = this.modalService.open(AddHotelModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.hotelId = hotelId;

    modalRef.result.then(
      (result) => {
        if (result === 'refresh') {
          this.fetchHotels();
          this.showToast('Hotel updated successfully.', 'success');
        }
      },
      () => { }
    );
  }


  showToast(message: string, type: 'success' | 'danger' | 'warning' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  hideToast() {
    this.toastVisible = false;
  }

}

import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {
  hotelList: any[] = [];
  loading = false;
  expandedHotels: Set<number> = new Set();
  imgBaseURL = environment.imgBaseURL;
  defaultImage = 'assets/images/defualtSlide.png';

  constructor(
    private hotelService: WebApplicationService,
    private scrollService: ScrollService,
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

  scrollToTop(): void {
    this.scrollService.goToTop();
  }
}

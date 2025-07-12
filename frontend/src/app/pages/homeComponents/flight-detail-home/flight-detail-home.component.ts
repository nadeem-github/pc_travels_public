import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flight-detail-home',
  templateUrl: './flight-detail-home.component.html',
  styleUrls: ['./flight-detail-home.component.scss']
})
export class FlightDetailHomeComponent {

  isLoading: boolean = false;
  blockData: any = null;
  imgBaseURL = environment.imgBaseURL;

  blockList: any[] = [];

  constructor(
    private blockHomeService: WebApplicationService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.getBlockHomeData();
    this.loadAvailableBlocks();
  }

  getBlockHomeData(): void {
    this.isLoading = true; // optional if loader add kar rahe
    this.blockHomeService.fetchBlockHome().subscribe({
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

  loadAvailableBlocks() {
    this.isLoading = true;
    this.blockHomeService.fetchAvailableBlocks().subscribe({
      next: (res) => {
        const allBlocks = res.data || [];
        this.blockList = allBlocks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading = false;
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

  scrollToTop(): void {
    this.scrollService.goToTop();
  }
}

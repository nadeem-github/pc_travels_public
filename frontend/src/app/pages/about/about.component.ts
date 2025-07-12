import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  blockData: any = null;
  imgBaseURL = environment.imgBaseURL;
  isLoading: boolean = false;

  constructor(
    private blockHomeService: WebApplicationService,
    private scrollService: ScrollService
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

  scrollToTop(): void {
    this.scrollService.goToTop();
  }
}

import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-holiday-packages-home',
  templateUrl: './holiday-packages-home.component.html',
  styleUrls: ['./holiday-packages-home.component.scss']
})
export class HolidayPackagesHomeComponent {

  packages: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  expandedHotels: Set<number> = new Set();
  imgBaseURL = environment.imgBaseURL;

  constructor(
    private service: WebApplicationService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
  this.isLoading = true;
  this.service.packagesFetch().subscribe({
    next: (res) => {
      if (res?.data?.rows) {
        // 🔽 Filter only 'Holiday Packages'
        this.packages = res.data.rows.filter((pkg: { name: string; }) => pkg.name === 'Holiday Package').slice(0, 3);
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

import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  packages: any[] = [];
  holidayPackages: any[] = [];
  umrahPackages: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  expandedHotels: Set<number> = new Set();
  imgBaseURL = environment.imgBaseURL;
  activeTab = 1; // Default to All Packages

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
          this.packages = res.data.rows;
          this.filterPackages(); // filter on fetch
        } else {
          this.errorMessage = 'No data found';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Something went wrong';
        this.isLoading = false;
      }
    });
  }

  filterPackages(): void {
    this.holidayPackages = this.packages.filter(pkg => pkg.name === 'Holiday Package');
    this.umrahPackages = this.packages.filter(pkg => pkg.name === 'Umrah Package');
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

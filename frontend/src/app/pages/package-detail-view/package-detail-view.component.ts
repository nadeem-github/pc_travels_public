import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';

@Component({
  selector: 'app-package-detail-view',
  templateUrl: './package-detail-view.component.html',
  styleUrls: ['./package-detail-view.component.scss']
})
export class PackageDetailViewComponent {

  packageList: any[] = [];
  isLoading = false;

  constructor(
    private packageService: WebApplicationService,
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

  packageDetails = [
    { icon: 'fa-plane-departure', title: 'Return Air Tickets' },
    { icon: 'fa-passport', title: 'Umrah Visa with Insurance' },
    { icon: 'fa-hotel', title: 'Stay in Hotels (Makkah and Madinah)' },
    { icon: 'fa-mosque', title: 'Ziyarat in Makkah and Madinah' },
    { icon: 'fa-bus', title: 'Roundtrip Transportation by AC Bus' },
    { icon: 'fa-utensils', title: '3 Times Meals' },
    { icon: 'fa-gift', title: 'Umrah kit' }
  ]
  
  documentsRequired = [
    { icon: 'fa-passport', title: 'Original Passport' },
    { icon: 'fa-image-portrait', title: 'Latest Passport size Photo' },
    { icon: 'fa-id-card', title: 'Pan Card' },
    { icon: 'fa-id-card', title: 'Aadhar Card' },
  ]


}

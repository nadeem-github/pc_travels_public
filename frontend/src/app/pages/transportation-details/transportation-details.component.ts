import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transportation-details',
  templateUrl: './transportation-details.component.html',
  styleUrls: ['./transportation-details.component.scss']
})
export class TransportationDetailsComponent {
  data: any = null;
  loading = false;

  imgBaseURL = environment.imgBaseURL;

  safePdfUrl: SafeResourceUrl | null = null;
  pdfLoading = false;
  pdfError = false;
  isMobile = false;

  constructor(
    private parallaxService: WebApplicationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.fetchData();
  }


  fetchData() {
    this.loading = true;
    this.pdfLoading = true;
    this.pdfError = false;

    this.parallaxService.transportationFetch().subscribe({
      next: res => {
        this.data = res.data.rows[0];

        const file = this.data.transport_pdf_image;
        if (file && this.isPdf(file)) {
          this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgBaseURL + file);
        }
      },
      error: () => {
        this.pdfError = true;
      },
      complete: () => {
        this.loading = false;
        this.pdfLoading = false;
      }
    });
  }



  isPdf(filePath: string): boolean {
    return filePath.toLowerCase().endsWith('.pdf');
  }

}

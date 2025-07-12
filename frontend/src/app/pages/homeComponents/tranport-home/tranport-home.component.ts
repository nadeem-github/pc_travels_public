import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tranport-home',
  templateUrl: './tranport-home.component.html',
  styleUrls: ['./tranport-home.component.scss']
})
export class TranportHomeComponent {

  data: any = null;
  loading = false;

  imgBaseURL = environment.imgBaseURL;

  constructor(
    private parallaxService: WebApplicationService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.parallaxService.transportationFetch().subscribe({
      next: res => this.data = res.data.rows[0],
      complete: () => this.loading = false
    });
  }
  
  scrollToTop(): void {
    this.scrollService.goToTop();
  }
}

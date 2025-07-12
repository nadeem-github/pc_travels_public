import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-visa-home',
  templateUrl: './work-visa-home.component.html',
  styleUrls: ['./work-visa-home.component.scss']
})
export class WorkVisaHomeComponent {

  data: any = null;
  loading = false;

  imgBaseURL = environment.imgBaseURL;

  constructor(
    private parallaxService: WebApplicationService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.parallaxService.workvisaFetch().subscribe({
      next: res => this.data = res.data.rows[0],
      complete: () => this.loading = false
    });
  }
}

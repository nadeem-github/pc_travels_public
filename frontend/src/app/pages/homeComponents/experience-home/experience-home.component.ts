import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-experience-home',
  templateUrl: './experience-home.component.html',
  styleUrls: ['./experience-home.component.scss']
})
export class ExperienceHomeComponent {

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
    this.parallaxService.parallaxFetch().subscribe({
      next: res => { this.data = res.data[0]; },
      complete: () => this.loading = false
    });
  }
}

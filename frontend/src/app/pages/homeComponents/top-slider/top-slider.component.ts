import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.scss']
})
export class TopSliderComponent {
  sliders: any[] = [];
  isLoading: boolean = true;
  imgBaseURL = environment.imgBaseURL;

  constructor(
    private sliderService: WebApplicationService,
  ) { }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders(): void {
    this.sliderService.fetchSliders().subscribe({
      next: (response) => {
        this.sliders = response.data?.rows || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}

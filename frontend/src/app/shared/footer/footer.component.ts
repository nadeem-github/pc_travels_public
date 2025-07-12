import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private scrollService: ScrollService) { }

  scrollToTop(): void {
    this.scrollService.goToTop();
  }

  currentYear: number = new Date().getFullYear();
  
}

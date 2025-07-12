import { Component, HostListener, Input } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { AuthGuard } from '../../guard/auth.guard';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() isOpen = true;

  constructor(
    private scrollService: ScrollService,
    private authService: AuthGuard
  ) { }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    const width = window.innerWidth;
    this.isOpen = width > 500;
  }

  scrollToTop(): void {
    this.scrollService.goToTop();
  }

  onLogout() {
    this.authService.logout();
  }

}

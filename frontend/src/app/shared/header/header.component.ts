import { Component, HostListener } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuCollapsed = true;
  isMobileMenuOpen: boolean = false;

  constructor(private scrollService: ScrollService) { }

  scrollToTop(): void {
    this.scrollService.goToTop();
  }

  toggleMobileDropdown() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideDropdown = target.closest('.servicesDropdown');
    const isMobile = window.innerWidth <= 991;

    if (!clickedInsideDropdown && isMobile && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

}

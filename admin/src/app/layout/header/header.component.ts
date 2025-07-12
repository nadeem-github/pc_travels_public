import { Component, EventEmitter, Output } from '@angular/core';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentDateTime: string = '';
  private intervalId: any;

  constructor(
    private scrollService: ScrollService,
    private authService: AuthGuard
  ) { }

  ngOnInit(): void {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime(): void {
    const now = new Date();
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = daysShort[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' }); // Jan
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12
    const hoursStr = String(hours).padStart(2, '0');

    this.currentDateTime = `${dayName} ${day}-${month}-${year} | ${hoursStr}:${minutes}:${seconds} ${ampm}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  onLogout() {
    this.authService.logout();
  }
}

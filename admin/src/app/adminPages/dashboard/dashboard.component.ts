import { Component } from '@angular/core';
import { AdminApisService } from 'src/app/services/admin-apis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { label: 'Total Visitors', key: 'visitorCount', value: 0, current: 0, icon: 'fa-users' },
    { label: 'Last Month Visitors', key: 'visitorLastMonthCount', value: 0, current: 0, icon: 'fa-calendar-alt', extra: this.getLastMonthName() },
    { label: 'Active Flights / Blocks', key: 'blockAvailableCount', value: 0, current: 0, icon: 'fa-plane' },
    { label: 'Packages Available', key: 'ourPackageCount', value: 0, current: 0, icon: 'fa-box' },
    { label: 'Hotels Listed', key: 'hotelCount', value: 0, current: 0, icon: 'fa-hotel' },
    { label: 'Active Agents', key: 'addYourAgentCount', value: 0, current: 0, icon: 'fa-user-tie' },
    { label: 'Recent User Email', key: 'contactUsRecentCount', value: 0, current: 0, icon: 'fa-envelope-open-text' },
    { label: 'Total User Email', key: 'contactUsCount', value: 0, current: 0, icon: 'fa-envelope' },
    { label: 'Last Month User Email', key: 'contactUsLastMonthCount', value: 0, current: 0, icon: 'fa-calendar-check', extra: this.getLastMonthName() }
  ];

  constructor(private dashboardService: AdminApisService) { }

  ngOnInit(): void {
    this.fetchDashboardStats();
  }

  fetchDashboardStats(): void {
    this.dashboardService.dashboardStats().subscribe({
      next: (res) => {
        if (res?.data) {
          this.stats.forEach(stat => {
            stat.value = res.data[stat.key] || 0;
          });
          this.animateCounters();
        }
      },
      error: (err) => {
        console.error('Error fetching dashboard stats:', err);
      }
    });
  }

  animateCounters(): void {
    this.stats.forEach(stat => {
      stat.current = 0;
      const increment = Math.ceil(stat.value / 60);
      const interval = setInterval(() => {
        if (stat.current < stat.value) {
          stat.current += increment;
          if (stat.current > stat.value) stat.current = stat.value;
        } else {
          clearInterval(interval);
        }
      }, 30);
    });
  }

  getLastMonthName(): string {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}

import { Component } from '@angular/core';
import { AdminApisService } from 'src/app/services/admin-apis.service';

@Component({
  selector: 'app-users-email',
  templateUrl: './users-email.component.html',
  styleUrls: ['./users-email.component.scss']
})
export class UsersEmailComponent {
  contactList: any[] = [];
  loading = true;

  constructor(private contactService: AdminApisService) { }

  ngOnInit(): void {
    this.contactService.fetchContacts().subscribe({
      next: (res) => {
        this.contactList = res?.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching contacts', err);
      }
    });
  }

  expandedMessages: { [id: number]: boolean } = {};

  toggleMessage(id: number): void {
    this.expandedMessages[id] = !this.expandedMessages[id];
  }
}

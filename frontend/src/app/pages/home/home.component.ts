import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private visitorService: WebApplicationService) { }

  ngOnInit(): void {
    this.visitorService.createVisitor().subscribe({
      next: (res) => {
        // console.log('Visitor logged successfully:', res);
      },
      error: (err) => {
        console.error('Failed to log visitor:', err);
      }
    });
  }
  
}

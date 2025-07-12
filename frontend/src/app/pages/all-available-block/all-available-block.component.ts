import { Component } from '@angular/core';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-available-block',
  templateUrl: './all-available-block.component.html',
  styleUrls: ['./all-available-block.component.scss']
})
export class AllAvailableBlockComponent {

  isLoading: boolean = false;
  blockList: any[] = [];
  imgBaseURL = environment.imgBaseURL;

  constructor(
    private blockHomeService: WebApplicationService,
  ) { }

  ngOnInit(): void {
    this.loadAvailableBlocks();
  }


  loadAvailableBlocks() {
    this.isLoading = true;
    this.blockHomeService.fetchAvailableBlocks().subscribe({
      next: (res) => {
        this.blockList = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

}

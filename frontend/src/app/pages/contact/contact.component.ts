import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebApplicationService } from 'src/app/services/web-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm!: FormGroup;
  isSubmitting = false;

  packages: any[] = [];
  filteredPackages: any[] = [];
  agentAreas: string[] = [];
  selectedArea: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  imgBaseURL = environment.imgBaseURL;

  toast = {
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  };

  constructor(private fb: FormBuilder, private contactService: WebApplicationService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      phone_number: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.fetchPackages();

  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    this.contactService.submitContactForm(this.contactForm.value).subscribe({
      next: (res) => {
        this.showToast(res.message || 'Message sent successfully!', 'success');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.showToast('Something went wrong!', 'error');
        this.isSubmitting = false;
      }
    });
  }

  fetchPackages(): void {
    this.isLoading = true;
    this.contactService.agentFetch().subscribe({
      next: (res) => {
        if (res?.data) {
          this.packages = res.data;
          this.filteredPackages = res.data;

          // Get unique agent_area values
          this.agentAreas = [...new Set(this.packages.map(pkg => pkg.agent_area))];
        } else {
          this.errorMessage = 'No data found';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong';
        this.isLoading = false;
      }
    });
  }

  onAreaChange(area: string): void {
    this.selectedArea = area;
    if (area) {
      this.filteredPackages = this.packages.filter(pkg => pkg.agent_area === area);
    } else {
      this.filteredPackages = this.packages;
    }
  }
}

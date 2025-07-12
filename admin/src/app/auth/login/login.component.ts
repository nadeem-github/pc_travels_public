import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApisService } from 'src/app/services/admin-apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  toastMessage = '';
  showToast = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AdminApisService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.toastMessage = '';
    this.showToast = false;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastMessage = err.error?.message || 'Login failed. Please try again.';
        this.showToast = true;
        this.loading = false;

        // Auto-hide after 4 sec
        setTimeout(() => {
          this.showToast = false;
        }, 4000);
      }
    });
  }
}

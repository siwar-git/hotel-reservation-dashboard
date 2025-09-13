// sign-in.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sign-in',
  standalone: true, // <-- Notez standalone: true
  imports: [
    CommonModule,
    ReactiveFormsModule, // <-- Ajoutez ceci
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePass: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/analytics';
  }

  login() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, motDePass } = this.loginForm.value;

    this.authService.login(email, motDePass).subscribe({
      next: (response) => {
        this.handleLoginSuccess(response);
      },
      error: (error) => {
        this.handleLoginError(error);
      }
    });
  }

  private handleLoginSuccess(response: any) {
    this.loading = false;
    this.tokenService.storeToken(response.token);
    this.tokenService.storeUser(response.user);
    this.router.navigateByUrl(this.returnUrl);
  }

  private handleLoginError(error: any) {
    this.loading = false;
    Swal.fire({
      icon: 'error',
      title: 'Erreur de connexion',
      text: error.message || 'Email ou mot de passe incorrect',
      footer: 'Veuillez réessayer'
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
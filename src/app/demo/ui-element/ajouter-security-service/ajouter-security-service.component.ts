import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-ajouter-security-service',
  standalone: true,
  imports: [SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-security-service.component.html',
  styleUrl: './ajouter-security-service.component.scss'
})
export default class AjouterSecurityServiceComponent implements OnInit {
  securityForm!: FormGroup;
  hotelId!: number;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.params['hotelId'];

    this.securityForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      // Ajoutez d'autres champs spécifiques à votre entité SecurityService
    });
  }

  onSubmit(): void {
    if (this.securityForm.valid) {
      const securityData = this.securityForm.value;
      this.securityService.addSecurityService(this.hotelId, securityData).subscribe({
        next: (response) => {
          console.log('Service de sécurité ajouté avec succès:', response);
          this.router.navigate(['/hotel/details', this.hotelId]); // Redirigez où c'est approprié
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du service de sécurité:', error);
        }
      });
    }
  }
}
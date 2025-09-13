import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { EntertainmentService } from 'src/app/services/entertainment.service';

@Component({
  selector: 'app-ajouter-entertainment-service',
  standalone: true,
  imports: [SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-entertainment-service.component.html',
  styleUrl: './ajouter-entertainment-service.component.scss'
})
export default class AjouterEntertainmentServiceComponent implements OnInit {
  entertainmentForm!: FormGroup;
  hotelId!: number;

  constructor(
    private fb: FormBuilder,
    private entertainmentService: EntertainmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.params['hotelId'];

    this.entertainmentForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      // Ajoutez d'autres champs spécifiques à votre entité EntertainmentService
    });
  }

  onSubmit(): void {
    if (this.entertainmentForm.valid) {
      const entertainmentData = this.entertainmentForm.value;
      this.entertainmentService.addEntertainmentService(this.hotelId, entertainmentData).subscribe({
        next: (response) => {
          console.log('Service de divertissement ajouté avec succès:', response);
          this.router.navigate(['/hotel/details', this.hotelId]); // Redirigez où c'est approprié
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du service de divertissement:', error);
        }
      });
    }
  }
}
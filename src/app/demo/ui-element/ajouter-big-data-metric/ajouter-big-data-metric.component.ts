import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { BigDataMetricService } from 'src/app/services/bigDataMetric.service';

@Component({
  selector: 'app-ajouter-big-data-metric',
  standalone: true,
  imports: [SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-big-data-metric.component.html',
  styleUrl: './ajouter-big-data-metric.component.scss'
})
export default class AjouterBigDataMetricComponent implements OnInit {
  metricForm!: FormGroup;
  hotelId!: number;

  constructor(
    private fb: FormBuilder,
    private bigDataMetricService: BigDataMetricService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.params['hotelId'];

    this.metricForm = this.fb.group({
      nom: ['', Validators.required],
      valeur: ['', Validators.required],
      dateCreation: [new Date(), Validators.required], // Vous pouvez ajuster le type et la validation
      // Ajoutez d'autres champs spécifiques à votre entité BigDataMetric
    });
  }

  onSubmit(): void {
    if (this.metricForm.valid) {
      const metricData = this.metricForm.value;
      this.bigDataMetricService.addBigDataMetric(this.hotelId, metricData).subscribe({
        next: (response) => {
          console.log('Métrique Big Data ajoutée avec succès:', response);
          this.router.navigate(['/hotel/details', this.hotelId]); // Redirigez où c'est approprié
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la métrique Big Data:', error);
        }
      });
    }
  }
}
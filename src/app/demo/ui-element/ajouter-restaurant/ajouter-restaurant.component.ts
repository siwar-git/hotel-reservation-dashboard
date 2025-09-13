// TypeScript pour l'ajout d'un **restaurant**
// Nom du composant : AddRestaurantComponent
// Service utilisé : restaurantService

// Idem pour les autres composants à adapter (offre, service, spa, conférence)

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-ajouter-restaurant',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-restaurant.component.html',
  styleUrls: ['./ajouter-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  selectedImageFile?: File;
  selectedGalleryFiles: File[] = [];
  hotelId: number = 0;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['hotelId'];
    this.hotelId = +paramId;
    if (isNaN(this.hotelId)) {
      this.toastr.error("ID d'hôtel invalide");
      this.router.navigate(['/hotels']);
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImageFile = input.files[0];
    }
  }

  onGallerySelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedGalleryFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    Object.entries(this.restaurantForm.value).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
          formData.append(key, value);
        }    
    });

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.selectedGalleryFiles.forEach(file => {
      formData.append('images', file);
    });

    this.restaurantService.saveRestaurant(formData, this.hotelId).subscribe({
      next: () => {
        this.toastr.success('Restaurant ajouté avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout du restaurant.");
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

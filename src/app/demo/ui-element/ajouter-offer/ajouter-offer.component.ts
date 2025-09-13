import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/services/offer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-offre',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-offer.component.html',
  styleUrls: ['./ajouter-offer.component.scss']
})
export class AddOffreComponent implements OnInit {
  offreForm: FormGroup;
  selectedImageFile?: File;
  hotelId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private offreService: OfferService,
    private toastr: ToastrService
  ) {
    this.offreForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.params['hotelId'];
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImageFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.entries(this.offreForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    this.offreService.saveOffer(formData, this.hotelId).subscribe({
      next: () => {
        this.toastr.success('Offre ajoutée avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout de l'offre.");
      }
    });
  }
}
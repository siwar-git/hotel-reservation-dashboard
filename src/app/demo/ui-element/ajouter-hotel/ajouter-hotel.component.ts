import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-ajouter-hotel',
  imports: [SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-hotel.component.html',
  styleUrl: './ajouter-hotel.component.scss'
})
export default class AjouterHotelComponent {
  hotelForm!: FormGroup;
  selectedPresentationFile?: File;
  selectedImageFile?: File;
  selectedGalleryFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsApp: [''],
      adresse: ['', Validators.required],
      nombre_etoiles: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      presentations: [''],
      image: [''],
      gallery: ['']
    });
  }

  onPresentationFileSelected(event: any): void {
    this.selectedPresentationFile = event.target.files[0];
  }

  onImageFileSelected(event: any): void {
    this.selectedImageFile = event.target.files[0];
  }

  onGalleryFilesSelected(event: any): void {
    this.selectedGalleryFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
  if (this.hotelForm.valid) {
    const formValue = this.hotelForm.value;
    const formData = new FormData();
    
    // Ajout des champs texte
    formData.append('nom', formValue.nom);
    formData.append('description', formValue.description);
    formData.append('telephone', formValue.telephone);
    formData.append('email', formValue.email);
    if (formValue.whatsApp) formData.append('whatsApp', formValue.whatsApp);
    formData.append('adresse', formValue.adresse);
    formData.append('nombre_etoiles', formValue.nombre_etoiles.toString());
    
    // Ajout des fichiers
    if (this.selectedPresentationFile) {
      formData.append('presentations', this.selectedPresentationFile);
    }
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    if (this.selectedGalleryFiles && this.selectedGalleryFiles.length > 0) {
      this.selectedGalleryFiles.forEach(file => {
        formData.append('gallery', file);
      });
    }

    // Debug: Afficher le contenu de FormData
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.hotelService.saveHotel(formData).subscribe({
      next: (response) => {
        console.log('Hotel added successfully:', response);
        this.router.navigate(['/hotels']);
      },
      error: (error) => {
        console.error('Error adding hotel:', error);
      }
    });
  }
}
}
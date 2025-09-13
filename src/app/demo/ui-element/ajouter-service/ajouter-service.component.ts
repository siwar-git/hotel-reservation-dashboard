import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-service',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-service.component.html',
  styleUrls: ['./ajouter-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  serviceForm: FormGroup;
  selectedImageFile?: File;
  selectedGalleryFiles: File[] = [];
  hotelId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ) {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      icon: ['', Validators.required],
      description: ['', Validators.required],
      details: ['']
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

  onGallerySelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedGalleryFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.entries(this.serviceForm.value).forEach(([key, value]) => {
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
    this.serviceService.saveService(formData, this.hotelId).subscribe({
      next: () => {
        this.toastr.success('Service ajouté avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout du service.");
      }
    });
  }
}
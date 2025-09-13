import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConferenceService } from 'src/app/services/conference.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-conference',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-conference.component.html',
  styleUrls: ['./ajouter-conference.component.scss']
})
export class AddConferenceComponent implements OnInit {
  conferenceForm: FormGroup;
  selectedImageFile?: File;
  selectedPresentation?: File;
  selectedGalleryFiles: File[] = [];
  hotelId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private conferenceService: ConferenceService,
    private toastr: ToastrService
  ) {
    this.conferenceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
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

  onPresentationSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedPresentation = input.files[0];
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
    Object.entries(this.conferenceForm.value).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      }
    });
    if (this.selectedImageFile) formData.append('image', this.selectedImageFile);
    if (this.selectedPresentation) formData.append('presentations_url', this.selectedPresentation);
    this.selectedGalleryFiles.forEach(file => {
      formData.append('images', file);
    });

    this.conferenceService.saveConference(formData, this.hotelId).subscribe({
      next: () => {
        this.toastr.success('Conférence ajoutée avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout de la conférence.");
      }
    });
  }
}

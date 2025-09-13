import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaService } from 'src/app/services/spa.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-spa',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent, ReactiveFormsModule],
  templateUrl: './ajouter-spa.component.html',
  styleUrls: ['./ajouter-spa.component.scss']
})
export class AddSpaComponent implements OnInit {
  spaForm: FormGroup;
  selectedImageFile?: File;
  selectedPresentation?: File;
  hotelId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spaService: SpaService,
    private toastr: ToastrService
  ) {
    this.spaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
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

  onPresentationFileSelected(event: any): void {
    this.selectedPresentation = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.entries(this.spaForm.value).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      }
    });
    if (this.selectedImageFile) formData.append('image', this.selectedImageFile);
if (this.selectedPresentation) {
  formData.append('presentations_url', this.selectedPresentation); // ✅ nom correct
}


    this.spaService.saveSpa(formData, this.hotelId).subscribe({
      next: () => {
        this.toastr.success('Spa ajouté avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout du spa.");
      }
    });
  }
}
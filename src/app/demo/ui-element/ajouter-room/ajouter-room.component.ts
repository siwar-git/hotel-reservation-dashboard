import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-ajouter-room',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ajouter-room.component.html',
  styleUrls: ['./ajouter-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  roomForm: FormGroup;
  selectedImageFile?: File;
  selectedGalleryFiles: File[] = [];
  hotelId: number = 0;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.roomForm = this.fb.group({
      type: ['', Validators.required],
      capacite: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      videoAudio: [''],
      internetTelephonie: [''],
      electronique: [''],
      salleDeBain: [''],
      terrainExterieurVue: [''],
      lits: [''],
      meubles: [''],
      autres: [''],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['hotelId'];
    this.hotelId = +paramId;
    console.log(this.hotelId)
    if (isNaN(this.hotelId)) {
      this.toastr.error('ID d\'hôtel invalide');
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

    // Ajout des champs texte au format string
    Object.entries(this.roomForm.value).forEach(([key, value]) => {
      if (key === 'price' || key === 'capacite' || key === 'surface') {
        formData.append(key, this.roomForm.value[key].toString());
      } else {
        formData.append(key, this.roomForm.value[key] ?? '');
      }
    });

    // Fichier principal obligatoire
    formData.append('image', this.selectedImageFile!);

    // Fichiers multiples (optionnels)
    this.selectedGalleryFiles.forEach(file => {
      formData.append('images', file);
    });

    this.roomService.saveRoom(formData, this.hotelId).subscribe({
      next: (rest:any) => {
        console.log(rest)
        this.toastr.success('Chambre ajoutée avec succès !');
        this.router.navigate(['/analytics']);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Erreur lors de l\'ajout de la chambre.');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
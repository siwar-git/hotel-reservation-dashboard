import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-update-etudient',
  imports: [ReactiveFormsModule,CommonModule,SharedModule,],
  templateUrl: './update-etudient.component.html',
  styleUrl: './update-etudient.component.scss'
})
export default  class UpdateEtudientComponent {
 
  userForm!: FormGroup; // Déclaration du formulaire utilisateur

  constructor(private fb: FormBuilder) {} // Injecter FormBuilder dans le constructeur

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.userForm = this.fb.group({
      nom: ['', Validators.required], // Nom de l'étudiant, requis
      prenom: ['', Validators.required], // Prénom de l'étudiant, requis
      email: ['', [Validators.required, Validators.email]], // Email de l'étudiant, requis et validé comme email
      telephone: ['', Validators.required], // Numéro de téléphone, requis
      numInscription: ['', Validators.required], // Numéro d'inscription, requis
      cin: ['', Validators.required], // CIN de l'étudiant, requis
      classeDepartement: ['', Validators.required], // Classe/Département, requis
      statut: ['', Validators.required], // Statut de l'étudiant, requis
      dateCreation: ['', Validators.required], // Date de création, requise
    });
  }

  onSubmit(): void {
    // Fonction pour traiter le formulaire lorsqu'il est soumis
    if (this.userForm.valid) {
      console.log('Utilisateur ajouté :', this.userForm.value);
      // Ici, tu pourrais appeler une API pour ajouter l'utilisateur, sauvegarder en base, etc.
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ServiceService } from 'src/app/services/service.service'; // ← ton service backend REST

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.scss']
})
export default class ListServiceComponent implements OnInit {

  services: any[] = [];
  searchText: string = '';

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(): void {
    this.serviceService.getAllServs().subscribe({
      next: (response) => {
        // Ajoute ici une logique si tu dois reformater les images par exemple
        this.services = response.map((s: any) => ({
          ...s,
          imageUrl: s.imageUrl ?? 'assets/img/default.png' // ou ton URL de base
        }));
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des services', error);
      }
    });
  }

  filteredServices() {
    if (!this.searchText.trim()) {
      return this.services;
    }
    return this.services.filter(service =>
      service.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      service.description?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteService(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce service ?')) {
      this.serviceService.deleteServ(id).subscribe({
        next: () => {
          this.services = this.services.filter(s => s.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du service', err);
        }
      });
    }
  }
}

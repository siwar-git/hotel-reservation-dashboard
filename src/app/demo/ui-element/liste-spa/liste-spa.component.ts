import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SpaService } from 'src/app/services/spa.service';

@Component({
  selector: 'app-list-spa',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-spa.component.html',
  styleUrls: ['./liste-spa.component.scss']
})
export default class ListSpaComponent implements OnInit {

  spas: any[] = [];
  searchText: string = '';

  constructor(private spaService: SpaService) { }

  ngOnInit(): void {
    this.getAllSpas();
  }

  getAllSpas(): void {
    this.spaService.getAllSpas().subscribe({
      next: (response) => {
        this.spas = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des spas', error);
      }
    });
  }

  filteredSpas() {
    if (!this.searchText.trim()) {
      return this.spas;
    }
    return this.spas.filter(spa =>
      spa.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      spa.description?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteSpa(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce spa ?')) {
      this.spaService.deleteSpa(id).subscribe({
        next: () => {
          this.spas = this.spas.filter(s => s.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du spa', err);
        }
      });
    }
  }
}

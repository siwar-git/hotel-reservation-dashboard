import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list-hotel',
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-hotel.component.html',
  styleUrls: ['./liste-hotel.component.scss']
})
export default class ListHotelComponent implements OnInit {

  hotels: any[] = []; // Tous les hôtels
  searchText: string = ''; // Texte de recherche saisi

  constructor(private hotelService: HotelService, private router: Router) { }


  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (response) => {
        this.hotels = response; // Adapte selon ton back-end
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des hôtels', error);
      }
    });
  }

  filteredHotels() {
    const search = this.searchText.toLowerCase();
    return this.hotels.filter(hotel =>
      hotel.nom?.toLowerCase().includes(search) ||
      hotel.description?.toLowerCase().includes(search) ||
      hotel.adresse?.toLowerCase().includes(search) ||
      hotel.nombre_etoiles?.toString().includes(search) ||
      hotel.telephone?.includes(search) ||
      hotel.email?.toLowerCase().includes(search)
    );
  }
  ajouterRoom(hotelId: number): void {
    this.router.navigate(['/ajouter-room', hotelId]);
  }
  deleteHotel(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet hôtel ?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          this.hotels = this.hotels.filter(hotel => hotel._id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'hôtel', err);
        }
      });
    }
  }
}
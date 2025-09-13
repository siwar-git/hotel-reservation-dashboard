import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-listroom',
  imports: [SharedModule, RouterModule],
  templateUrl: './listroom.component.html',
  styleUrls: ['./listroom.component.scss']
})
export default class ListetudiantComponent implements OnInit {

  rooms: any[] = []; // Toutes les chambres
  searchText: string = ''; // Texte de recherche saisi

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (response) => {
        this.rooms = response; // Adapte selon ton back-end
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chambres', error);
      }
    });
  }

  filteredRooms() {
    const search = this.searchText.toLowerCase();
    return this.rooms.filter(room =>
      room.type?.toLowerCase().includes(search) ||
      room.description?.toLowerCase().includes(search) ||
      room.capacite?.toString().includes(search) ||
      room.surface?.toString().includes(search) ||
      room.price?.toString().includes(search)
    );
  }

  deleteRoom(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette chambre ?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.rooms = this.rooms.filter(room => room._id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la chambre', err);
        }
      });
    }
  }
}

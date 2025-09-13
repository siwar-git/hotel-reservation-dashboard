import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list-restaurant',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-restaurant.component.html',
  styleUrls: ['./liste-restaurant.component.scss']
})
export default class ListrestaurantComponent implements OnInit {

  restaurants: any[] = [];
  searchText: string = '';

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (response) => {
        this.restaurants = response; // ici on suppose que c’est une liste directe
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des restaurants', error);
      }
    });
  }

  filteredRestaurants() {
    if (!this.searchText.trim()) {
      return this.restaurants;
    }
    return this.restaurants.filter(restaurant =>
      restaurant.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      restaurant.specialite.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteRestaurant(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce restaurant ?')) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter(r => r.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du restaurant', err);
        }
      });
    }
  }
}

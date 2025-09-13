import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list-offer',
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-offer.component.html',
  styleUrls: ['./liste-offer.component.scss']
})
export default class ListOfferComponent implements OnInit {

  offers: any[] = []; // Toutes les offres
  searchText: string = ''; // Texte de recherche saisi

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.getAllOffers();
  }

  getAllOffers(): void {
    this.offerService.getAllOffers().subscribe({
      next: (response) => {
        this.offers = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    });
  }

  filteredOffers() {
    const search = this.searchText.toLowerCase();
    return this.offers.filter(offer =>
      offer.title?.toLowerCase().includes(search) ||
      offer.description?.toLowerCase().includes(search)
    );
  }

  deleteOffer(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offerService.deleteOffer(id).subscribe({
        next: () => {
          this.offers = this.offers.filter(offer => offer._id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'offre', err);
        }
      });
    }
  }
}
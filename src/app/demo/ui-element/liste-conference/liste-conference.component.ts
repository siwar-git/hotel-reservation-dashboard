import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceService } from 'src/app/services/conference.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-list-conference',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './liste-conference.component.html',
  styleUrls: ['./liste-conference.component.scss']
})
export default class ListConferenceComponent implements OnInit {

  conferences: any[] = [];
  searchText: string = '';

  constructor(private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.getAllConferences();
  }

  getAllConferences(): void {
    this.conferenceService.getAllConferences().subscribe({
      next: (response) => {
        this.conferences = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des conférences', error);
      }
    });
  }

  filteredConferences() {
    if (!this.searchText.trim()) {
      return this.conferences;
    }
    return this.conferences.filter(conference =>
      conference.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      conference.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteConference(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette conférence ?')) {
      this.conferenceService.deleteConference(id).subscribe({
        next: () => {
          this.conferences = this.conferences.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la conférence', err);
        }
      });
    }
  }
}

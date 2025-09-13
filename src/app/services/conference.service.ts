import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  private apiUrl = 'http://localhost:8081/Conference'; // URL de votre backend

  constructor(private http: HttpClient) { }

  // Créer une nouvelle conférence pour un hôtel spécifique
  saveConference(formData: FormData, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveConference/${hotelId}`, formData);
  }

  // Obtenir toutes les conférences
  getAllConferences(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ConferencesList`);
  }

  // Obtenir une conférence par son ID
  getConferenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer une conférence
  deleteConference(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une conférence
  updateConference(id: number, conferenceDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, conferenceDetails);
  }

  // Obtenir les conférences par ID d'hôtel
  getConferencesByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/${hotelId}`);
  }
}
// entertainment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  private apiUrl = 'http://localhost:8081/entertainment';

  constructor(private http: HttpClient) {}

  // Ajouter un service de divertissement
  addEntertainmentService(hotelId: number, entertainmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hotels/${hotelId}`, entertainmentData);
  }

  // Obtenir tous les services de divertissement
  getAllEntertainmentServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Supprimer un service
  deleteEntertainmentService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Correction de la route de suppression
  }

  // Mettre à jour un service
  updateEntertainmentService(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData); // Correction de la route de mise à jour
  }
}
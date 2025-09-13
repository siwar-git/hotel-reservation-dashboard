import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaService {
  private apiUrl = 'http://localhost:8081/Spa'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  // Créer un nouveau spa pour un hôtel spécifique
  saveSpa(formData: FormData, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveSpa/${hotelId}`, formData);
  }

  // Obtenir tous les spas
  getAllSpas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SpasList`);
  }

  // Obtenir un spa par son ID
  getSpaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un spa
  deleteSpa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un spa
  updateSpa(id: number, spaDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, spaDetails);
  }

  // Obtenir les spas par ID d'hôtel
  getSpasByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/${hotelId}`);
  }
}
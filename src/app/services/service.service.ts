import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8081/Serv'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  // Créer un nouveau service pour un hôtel spécifique
  saveService(formData: FormData, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveService/${hotelId}`, formData);
  }

  // Obtenir tous les services
  getAllServs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ServsList`);
  }

  // Obtenir un service par son ID
  getServById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un service
  deleteServ(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un service
  updateServ(id: number, servDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, servDetails);
  }

  // Obtenir les services par ID d'hôtel
  getServsByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/${hotelId}`);
  }
}
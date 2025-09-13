// security.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiUrl = 'http://localhost:8081/security';

  constructor(private http: HttpClient) {}

  // Ajouter un service de sécurité à un hôtel
  addSecurityService(hotelId: number, securityData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hotels/${hotelId}`, securityData);
  }

  // Récupérer tous les services de sécurité
  getAllSecurityServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Supprimer un service de sécurité par ID
  deleteSecurityService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Correction de la route de suppression
  }

  // Modifier un service de sécurité
  updateSecurityService(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData); // Correction de la route de mise à jour
  }
}
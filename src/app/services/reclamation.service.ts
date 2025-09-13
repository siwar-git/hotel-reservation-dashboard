import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8081/client';

  constructor(private http: HttpClient) {}

  // ✅ Créer une réclamation par le client
  createReclamation(clientId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clientId}/reclamation`, data);
  }

  // ✅ Récupérer toutes les réclamations (côté admin)
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/reclamations`);
  }

  // ✅ Répondre à une réclamation (ex: envoie d'une notification)
  respondToReclamation(reclamationId: number, message: string): Observable<any> {
    return this.http.post(`http://localhost:8081/reclamations/${reclamationId}/repondre`, { message });
  }
}

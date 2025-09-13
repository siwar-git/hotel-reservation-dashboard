import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8081/client'; // À adapter si l'URL backend change

  constructor(private http: HttpClient) { }

  // ✅ Ajouter un client
  saveClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveClient`, client);
  }

  // ✅ Liste des clients
  getAllClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ClientsList`);
  }

  // ✅ Récupérer un client par ID
  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Supprimer un client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Mettre à jour un client
  updateClient(id: number, clientDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, clientDetails);
  }

  // ✅ Uploader une image de profil client
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }

  // ✅ Récupérer le nombre total de clients
  getTotalClients(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}

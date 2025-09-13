// bigDataMetric.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigDataMetricService {
  private apiUrl = 'http://localhost:8081/bigdata';

  constructor(private http: HttpClient) {}

  // Ajouter une métrique
  addBigDataMetric(hotelId: number, metricData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hotels/${hotelId}`, metricData);
  }

  // Obtenir toutes les métriques
  getAllMetrics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Supprimer une métrique
  deleteMetric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Correction de la route de suppression
  }

  // Mettre à jour une métrique
  updateMetric(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData); // Correction de la route de mise à jour
  }
}
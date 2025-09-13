import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:8081/Hotel';

  constructor(private http: HttpClient) { }

  saveHotel(formData: FormData): Observable<any> {
    // Pas besoin de headers spécifiques pour FormData, Angular les gère automatiquement
    return this.http.post<any>(`${this.apiUrl}/saveHotel`, formData);
  }

  // ✅ Get recommended hotels
  getRecommendedHotels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recommended`);
  }

  // ✅ Get all hotels
  getAllHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/HotelsList`);
  }

  // ✅ Get hotel by ID
  getHotelById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Delete hotel
  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Update hotel (correspond à @RequestBody)
  updateHotel(id: number, hotelDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hotelDetails);
  }

  // ✅ Get total hotels
  getTotalHotels(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  // ✅ Get hotels summary (nouveau endpoint)
  getHotelsSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels-summary`);
  }
}

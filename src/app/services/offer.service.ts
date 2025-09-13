import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8081/Offer'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  // Create a new offer for a specific hotel
  saveOffer(formData: FormData, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveOffer/${hotelId}`, formData);
  }

  // Get all offers
  getAllOffers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/OffersList`);
  }

  // Get a single offer by ID
  getOfferById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Delete an offer
  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update an offer
  updateOffer(id: number, offerDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, offerDetails);
  }

  // Get offers by hotel ID
  getOffersByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/${hotelId}`);
  }
}
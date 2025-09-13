import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8081/Restaurant'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  // Create a new restaurant for a specific hotel
    saveRestaurant(formData: FormData, hotelId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/saveRestaurant/${hotelId}`, formData);
    }

  // Get all restaurants
  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RestaurantsList`);
  }

  // Get a single restaurant by ID
  getRestaurantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Delete a restaurant
  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a restaurant
  updateRestaurant(id: number, restaurantDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurantDetails);
  }

  // Get restaurants by hotel ID
  getRestaurantsByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/${hotelId}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8081/Room';

  constructor(private http: HttpClient) { }

  // ✅ Create a new room
  saveRoom(formData: FormData, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveRoom/${hotelId}`, formData);
  }

  // ✅ Get all rooms
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/RoomsList`);
  }

  // ✅ Get a room by ID
  getRoomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Delete a room
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Update a room (must also be sent as FormData due to @ModelAttribute)
  updateRoom(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  // ✅ Get rooms by hotel ID
  getRoomsByHotelId(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  // ✅ Get total rooms count
  getTotalRooms(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}

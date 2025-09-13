import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8081/api/reservations'; // Remplace par ton vrai URL backend si nécessaire

  constructor(private http: HttpClient) { }

  // ✅ Réserver une chambre
  reserverRoom(clientId: number, roomId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/room`, null, {
      params: {
        clientId: clientId.toString(),
        roomId: roomId.toString()
      }
    });
  }

  // ✅ Réserver un spa
  reserverSpa(clientId: number, spaId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/spa`, null, {
      params: {
        clientId: clientId.toString(),
        spaId: spaId.toString()
      }
    });
  }

  // ✅ Réserver un restaurant
  reserverRestaurant(clientId: number, restaurantId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restaurant`, null, {
      params: {
        clientId: clientId.toString(),
        restaurantId: restaurantId.toString()
      }
    });
  }

  // ✅ Réserver une salle de conférence
  reserverConference(clientId: number, conferenceRoomId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conference`, null, {
      params: {
        clientId: clientId.toString(),
        conferenceRoomId: conferenceRoomId.toString()
      }
    });
  }

  // ✅ Réserver et payer une chambre
  reserverEtPayerRoom(clientId: number, roomId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rooms`, null, {
      params: {
        clientId: clientId.toString(),
        roomId: roomId.toString()
      }
    });
  }

  // ✅ Réserver et payer (générique : room, spa, restaurant, conference)
  reserverEtPayer(clientId: number, itemId: number, type: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserver`, null, {
      params: {
        clientId: clientId.toString(),
        itemId: itemId.toString(),
        type: type
      }
    });
  }

  // ✅ Obtenir le total des réservations
  getTotalReservations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}

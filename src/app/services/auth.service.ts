import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) { }
  
  login(email: string, motDePass: string): Observable<any> {
    // Adapte les noms de champs pour le backend
    const loginData = {
      email: email,
      motDePass: motDePass  // Utilise le nom attendu par le backend
    };

    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Email ou mot de passe incorrect';
          break;
        case 500:
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard';
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
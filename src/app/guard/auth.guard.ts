// core/guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.isLoggedIn()) {
      return true;
    }
    
    // Redirige vers la page de connexion et conserve l'URL demandée
    return this.router.createUrlTree(['/auth/signin'], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}
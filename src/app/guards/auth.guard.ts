import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Importe seu serviço de autenticação

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permite o acesso à rota se o usuário estiver autenticado
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
      return false;
    }
  }
}

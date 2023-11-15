import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../models/loginRequest';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const loginRequest: LoginRequest = {
      UserName: 'usuario', // Agrega un nombre de usuario y contraseña válidos
      Password: 'contraseña' 
    };

    return this.loginService.GetDetails(loginRequest).pipe(
      take(1),
      map((data: any) => {
        if (data && data.Role === 'Admin') {
          return true;
        } else {
          this.router.navigate(['/error']);
          return false;
        }
      })
    );
  }
}

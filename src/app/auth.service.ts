import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { LoginRequest } from './models/loginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  private currentUserRoleSubject = new BehaviorSubject<string>('');
  public currentUserRole$: Observable<string> = this.currentUserRoleSubject.asObservable();
  

  constructor(private router: Router, private loginservice: LoginService) {
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.currentUserRoleSubject.next(user.Role);
    }
  }

  login(user: any) {
    this.loginservice.GetDetails(user).subscribe((data) => {
      console.log('Respuesta del servicio:', data);

      if (data.Role === 'Admin' || data.Role === 'Mesero') {
        localStorage.setItem('currentUser', JSON.stringify(data));
        const targetRoute = data.Role === 'Admin' ? '/home' : '/homeM';
        this.router.navigate([targetRoute], { skipLocationChange: true });
      } else {
        alert('Error: No tiene permisos para acceder a esta página');
        console.log('Error: No tiene permisos para acceder a esta página');
      }

      this.currentUserSubject.next(data);
    });
  }

  checkUserRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user && user.role === role;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}

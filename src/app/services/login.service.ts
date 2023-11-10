import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  ValidateUser(username: string, password: string): Observable<any> {
    const userData = {
      UserName: username,
      Password: password
    };
    return this.http.post<any>('https://localhost:44385/api/Users/GetUserData', userData);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  url: string = "https://localhost:44385/api/Users/GetUserData";

  GetDetails(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(this.url, loginRequest);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  url: string = "https://localhost:44385/api/Users";

  GetUsers() {
    return this.http.get(this.url);
  }

  loadRol() {
    return this.http.get<string[]>("https://localhost:44385/api/Users/GetRoles");
  }

  AddUsers(users: Users): Observable<Users> {
    return this.http.post<Users>(this.url, users);
  }

  UpdateUsers(Id: number, users: Users): Observable<Users> {
    return this.http.put<Users>(this.url + `/${Id}`, users);
  }

  DeleteUsers(Id: number) {
    return this.http.delete(this.url + `/${Id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverUrl = 'http://localhost:1433'; // Reemplaza con la URL de tu servidor

  constructor(private http: HttpClient) {}

  getDatos() {
    return this.http.get(`${this.serverUrl}/datos`);
  }
}

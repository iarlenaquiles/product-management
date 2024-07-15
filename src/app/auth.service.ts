import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post(`${this.apiUrl}/login`, { headers, withCredentials: true }).pipe(
        tap((response: any) => {
            const userId = response.userId;
            const token = response.token;

            this.isLoggedIn = true;
        })
    );
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/users'; 

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  login(email: string, password: string): Observable<User> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<User>(`${this.apiUrl}/login`, body.toString(), { headers });
  }

  update(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/update`, user);
  }

  forgotPassword(email: string): Observable<string> {
    const params = new URLSearchParams();
    params.set('email', email);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<string>(`${this.apiUrl}/forgot-password`, params.toString(), { headers });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAll`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  search(val: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search`, {
      params: { val },
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  promote(user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/promote`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  demote(user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/demote`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
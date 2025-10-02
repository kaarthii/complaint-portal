import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import this
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUser: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    });

    return this.http.get(`${this.apiUrl}/login`, { headers }).pipe(
      tap(user => {
        if (isPlatformBrowser(this.platformId)) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authHeader', headers.get('Authorization')!);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authHeader');
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('currentUser');
    }
    return false; 
  }

  getAuthHeader(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authHeader');
    }
    return null; 
  }
}
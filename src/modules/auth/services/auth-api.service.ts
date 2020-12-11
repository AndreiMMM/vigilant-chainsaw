import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtInterface } from '../models/jwt.interface';
import { HttpSuccessResponseInterface } from '../../shared/models/http-success-response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly baseUrl = '/api';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  public login(
    userInfo: UserInterface
  ): Observable<HttpSuccessResponseInterface<JwtInterface>> {
    if (userInfo.username === 'admin') {
      return of(null);
    }
    return this.httpClient.post<HttpSuccessResponseInterface<JwtInterface>>(
      `${this.baseUrl}/login`,
      userInfo
    );
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['/']);
  }

  public getJwtToken(): string {
    return localStorage.getItem('ACCESS_TOKEN');
  }
}

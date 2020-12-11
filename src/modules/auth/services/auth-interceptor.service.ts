import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(public authApiService: AuthApiService) {}
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authApiService.getJwtToken()}`,
      },
    });
    return next.handle(request);
  }
}

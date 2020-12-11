import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authApiService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
      this.snackBar.open('Please sign in', 's', {
        duration: 3000,
      });
    }
    return isLoggedIn;
  }
}

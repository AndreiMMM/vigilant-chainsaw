import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../../auth/services/auth-api.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  constructor(private readonly authApiService: AuthApiService) {}

  public ngOnInit(): void {}

  public logout(): void {
    this.authApiService.logout();
  }
}

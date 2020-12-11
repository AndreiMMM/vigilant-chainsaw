import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private readonly router: Router) {}

  public ngOnInit(): void {}

  public navigate(route: string): void {
    this.router.navigate([route]);
  }
}

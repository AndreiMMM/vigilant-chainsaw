import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthApiService} from '../../services/auth-api.service';
import {UserInterface} from '../../models/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly router: Router
  ) {}

  public loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public ngOnInit(): void {}

  public login(): void {
    if (this.loginFormGroup.status === 'INVALID') {
      this.loginFormGroup.markAllAsTouched();
    } else {
      const userCredentials = this.loginFormGroup.value as UserInterface;
      this.authApiService.login(userCredentials).subscribe(() => {
        localStorage.setItem('ACCESS_TOKEN', 'JWt');
        this.router.navigate(['/dashboard/contacts']);
      });
    }
  }
}

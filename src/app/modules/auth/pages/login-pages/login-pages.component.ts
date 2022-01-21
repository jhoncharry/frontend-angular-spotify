import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css'],
})
export class LoginPagesComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {
    console.log("2222222222222222");
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.authService
      .sendCredentials(email, password)
      //TODO: 200 <400
      .subscribe({
        next: (response) => {
          //TODO: Cuando el usuario credenciales Correctas ✔✔
          console.log('Session iniciada correcta', response);
          const { tokenSession, data } = response;
          this.cookie.set('token', tokenSession, 4, '/'); //TODO:📌📌📌📌
          this.router.navigate(['/', 'tracks']);
        },
        error: (error) => {
          //TODO error 400>=
          this.errorSession = true;
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
        },
      });
  }
}

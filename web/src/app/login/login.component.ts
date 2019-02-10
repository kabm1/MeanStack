import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`.error {color: red}`]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router, private token: TokenService, private user: UserService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [1, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(this.loginForm.value)
      .subscribe(
        (token) => {
          this.user.setUser(token['user']);
          this.user.saveUser(JSON.stringify(token['user']));
          this.token.saveToken(token['idToken']);
          console.log('login successful');
          this.router.navigateByUrl('/');
        },
        (err) => {
          if (err.status === 400 || err.status === 401) {
            this.error = '*' + err.error.message;
          }
        }
      );
  }
}

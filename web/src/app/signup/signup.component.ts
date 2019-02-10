import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
    this.signupForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required], this.asyncEmailValidator.bind(this)],
      'userPassword': formBuilder.group({
        'password': ['', [
          Validators.required
        ]],
        'confirmPassword': ['', [
          Validators.required
        ]]
        },
        {
          asyncValidator: this.asyncMatchingPasswordValidator.bind(this)
        }
      ),
      active: [1],
      previledge: []
    });
  }
  ngOnInit() {
  }


  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        const currAuth = this.auth;

        setTimeout(() => {
          currAuth.validate(control.value)
            .subscribe((emailExists) => {
                if (emailExists) {
                  console.log('email already existed')
                  resolve({'exists': true});
                } else
                  resolve(null);
              },
              (error) => {
                console.log(error.error.message);
              });
        }, 1500);
      }
    );
  }

  asyncMatchingPasswordValidator(userPassword: FormGroup): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {

        const pass = userPassword.controls.password.value;
        const repeatPass = userPassword.controls.confirmPassword.value;

        if (repeatPass.length <= 0) {
          resolve(null);
        }

        if (pass === repeatPass) {
          console.log('matched');
          resolve(null);
        } else {
          console.log('unmatched');
          resolve({'unmatched': true});
        }
      }, 1000);
    });
  }

  onSubmit() {
    this.auth.signup(this.signupForm.value)
      .subscribe((res) => {
          console.log(res);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log('error occurred');
        }
      );
  }
}


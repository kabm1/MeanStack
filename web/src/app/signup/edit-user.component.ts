import { User } from './../tabular/allusers/types';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [`.error {color: red}`]
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  searchForm: FormGroup;
  userExist = false;
  error = '';
  account;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router, private user: UserService) {
    this.editForm = formBuilder.group({
      firstName: [{value: '', disabled: true}, [Validators.required]],
      lastName: [{value: '', disabled: true}, [Validators.required]],
      email: [{value: '', disabled: true}, [Validators.required]],
      password: [{value: '', disabled: true}, [Validators.required]],
      active: [1],
      previledge: [{value: '', disabled: true}]
    });

    this.searchForm = formBuilder.group({
      email: ['', [Validators.required]],
    });

  }
  ngOnInit() {
  }

  onSearch() {
    // hide result form on the start of each search
    this.userExist = false;
    this.error = '';

    const email = this.searchForm.controls['email'].value;
    console.log(email);
    this.user.getUserByEmail(email)
    .subscribe( data =>  {
      if (data) {
        this.userExist = true;
        this.account = data;
        console.log('USER PROFILE: ' + JSON.stringify(data));
        this.editForm.controls['firstName'].setValue(this.account.firstName);
        this.editForm.controls['lastName'].setValue(this.account.lastName);
        this.editForm.controls['email'].setValue(this.account.email);
        this.editForm.controls['password'].setValue(this.account.password);
        this.editForm.controls['active'].setValue(this.account.active);
        this.editForm.controls['previledge'].setValue(this.account.previledge);
      }
    },
    err => {
      if (err.status === 404) {
      this.error = '*' + err.error.message;
    }
  });
}

  onSubmit() {
    this.account.active = this.editForm.controls['active'].value;
    this.auth.updateAccount(this.account)
      .subscribe((res) => {
          console.log(res);
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.log('error occurred' + err.error.message);
        }
      );
  }

}

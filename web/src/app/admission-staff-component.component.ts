import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { DbServiceService } from './services/db-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admission-staff-component',
  template: `
  <div class="container py-5">
  <div class="row">
    <div class="col-md-12">
      <!-- <h2 class="text-center text-white mb-4">Login Form</h2> -->
      <div class="row">
        <div class="col-md-6  mx-auto">

          <!-- form card login -->
          <div class="card rounded-0">
            <div class="card-header">
                <h3 class="mb-0">Invitations</h3>
            </div>
            <div class="card-body">


 
    <form id="invitation" [formGroup]="inviteForm" (ngSubmit)="onFormSubmit()">
    <label for="username">Prospective Student Email</label><br>
      <input type ="text" name="email" [formControl]="email" >
      <div [hidden]="email.valid || email.untouched">
      <div>
       Invalid Email
      </div>

      <div [hidden]="!email.hasError('email')">
        The email address format is not correct
      </div>
      </div><br>
      <span *ngIf="sent == false">Email already sent to that address.</span>
      <button type="submit" [disabled]="!email.valid"> Send Invitation</button>
      </form><br>

      <ag-grid-angular #agGrid [gridOptions]="gridOptions"
    style="width: 400px; height: 300px;" 
    class="ag-theme-balham">
</ag-grid-angular>


            </div>
            <!--/card-block-->
          </div>
          <!-- /form card login -->
        </div>
      </div>
      <!--/row-->
    </div>
    <!--/col-->
  </div>
  <!--/row-->
</div>
<!--/container-->
  `,
  styles: []
})
export class AdmissionStaffComponentComponent implements OnInit {
  sent = true;
  myRowData = [];
  email = new FormControl('', [
    Validators.required, Validators.email
  ])
  inviteForm: FormGroup = this.builder.group({
    email: this.email,

  });
  public gridOptions: GridOptions;
  constructor(private builder: FormBuilder, private api: DbServiceService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "Prospective Student Email",
        field: "email",
        filter: true
      },
      {
        headerName: "Initation Status",
        field: "status",
        filter: true
      },

    ];
    this.gridOptions.rowData = this.myRowData;
  }
  onFormSubmit(form: FormGroup) {
    console.log('clicked');
    for (let i in this.myRowData) {
      if (this.myRowData[i].email == this.email.value) {
        this.sent = false;
        return;
      }
    }
    var data = { 'email': this.email.value, 'status': 'SENT' };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.api.postInvites(JSON.stringify(data))
      .subscribe(res => {
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      })
      this.ngOnInit();
  }


  
  ngOnInit() {
    this.myRowData =[];
    this.api.getInvites().subscribe(res => {
      for (let i in res) {
        this.myRowData.push({ 'email': res[i].email, 'status': res[i].status });
      }
      this.gridOptions.api.setRowData(this.myRowData);
    }, err => {
      console.log(err);
    });
  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmissionStaffComponentComponent } from './admission-staff-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './services/authentication.service';
import { AllusersComponent } from './tabular/allusers/allusers.component';
import { HomeComponent } from './home/home.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { INITIAL_STATE, rootReducer, AppState } from './store';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { QuestionbankComponent } from './questionbank/questionbank.component';
import { SignupComponent } from './signup/signup.component';
import { EditUserComponent } from './signup/edit-user.component';
import { EditQuestionComponent } from './questionbank/edit-question.component';

import { ExamComponent} from './student/exam/exam.component';
import {AceEditorModule} from 'ng2-ace-editor';
import { EvaluationComponent } from './student/evaluation.component';
@NgModule({
  declarations: [
    AppComponent,
    AdmissionStaffComponentComponent, NavbarComponent,
    LoginComponent,
    SignupComponent,
    AllusersComponent,
    HomeComponent,
    QuestionbankComponent,
    EditUserComponent,
    EditQuestionComponent,
    ExamComponent,
    EvaluationComponent,
   // DoneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgReduxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(null),
    HttpClientModule, ReactiveFormsModule,
    FormsModule, AceEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, auth: AuthenticationService) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      null
    );
    if (auth.isLoggedIn()) {
      auth.getUser();
    }
  }
}

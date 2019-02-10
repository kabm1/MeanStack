import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html'
})
export class QuestionbankComponent implements OnInit {
  questionForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder, private router: Router, private api: ApiService) {
    this.questionForm = formBuilder.group({
      question: ['', [Validators.required]],
      active: [1, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      console.log(this.questionForm.value);
      await this.api.addQuestion(this.questionForm.value);

      this.router.navigateByUrl('/');

    } catch (error) {
      console.log(error);
      // this.error = 'Question creation failed';
    }
  }

}

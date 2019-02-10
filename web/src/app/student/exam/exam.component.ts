import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { acequire } from 'brace';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import { AnswerServiceService } from 'src/app/services/answer-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  /*template:` <ace-editor
  [(text)]="text" 
   #editor style="height:150px;"></ace-editor>`,*/
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  
  name = [];
  Question1: any;
  Question2: any
  Question3: any
  questions = [];
  id: string;
  pemail;
  ptoken;
  done="";
  constructor(private api: QuestionServiceService, private answerApi: AnswerServiceService,
     private route: ActivatedRoute,private router: Router) {
     }
   ngOnInit() {
    document.getElementById("p1").style.visibility = 'hidden';
document.getElementById("p2").style.visibility = 'hidden';
document.getElementById("p3").style.visibility = 'hidden';
    
  }
  mySubmit() {
    this.done = "Your Answer Has been Recorded, Thank you";
    document.getElementById("p1").style.visibility = 'hidden';
document.getElementById("p2").style.visibility = 'hidden';
document.getElementById("p3").style.visibility = 'hidden';
document.getElementById("myEditor1").style.visibility = 'hidden';
              document.getElementById("myEditor2").style.visibility = 'hidden';
              document.getElementById("myEditor3").style.visibility = 'hidden';
              document.getElementById('timer').style.visibility ='hidden';
    console.log("submited");
    var a = (document.getElementById('myEditor1').innerText);
    var b = (document.getElementById('myEditor2').innerText);
    var c = (document.getElementById('myEditor3').innerText);
    var data = { 'question1': this.Question1, 'answer1': a, 'question2': this.Question2, 'answer2': b, 'question3': this.Question3, 'answer3': c };
    this.answerApi.postAnswers(JSON.stringify(data))
      .subscribe(res => {
        this.router.navigate['DoneComponent'];
  
      }, (err) => {
        console.log(err);
      })
      this.router.navigate['DoneComponent'];
  }
  





  async myStart() {
    document.getElementById("p1").style.visibility = 'visible';
document.getElementById("p2").style.visibility = 'visible';
document.getElementById("p3").style.visibility = 'visible';
    await this.route.queryParamMap.subscribe(params => {
      this.pemail = params.params.email;
      this.ptoken = params.params.token;
      console.log(this.pemail);
      console.log(this.ptoken);
      this.api.getQuestions(this.pemail, this.ptoken).subscribe(res => {
        console.log(res);

        for (let i in res) {
          this.questions.push(res[i].question)
        }
        this.Question1 = this.questions[0];
        this.Question2 = this.questions[1];
        this.Question3 = this.questions[2];

      }, err => {
        console.log(err);
      });
    })

    console.log("my start clicked");
    document.getElementById("start").style.visibility = 'hidden';
    
        function counter(){
          var currentTime = new Date().getTime();
          // var eventTime = currentTime + 2;
          // var eventTime = new Date(2019,01,02).getTime();
      
          var remTime = currentTime;
          var h = 0;
          var m = 0;
          var s = 0;
          function sec(){
             
              document.getElementById("seconds").textContent="  : "+s;
              document.getElementById("hours").textContent =" "+ h;
              document.getElementById("minuets").textContent=" : "+m;
              s ++;
              if(s==60){
                m++;
                s = 0;
              }
              if(m==60){
                m = 0;
                h++;
              }
              if(h==2){
                 h = 0;
                 m = 0;
                 s = 0;
              document.getElementById("seconds").textContent="  : "+s;
              document.getElementById("hours").textContent =" "+ h;
              document.getElementById("minuets").textContent=" : "+m;
              document.getElementById("myEditor1").style.visibility = 'hidden';
              document.getElementById("myEditor2").style.visibility = 'hidden';
              document.getElementById("myEditor3").style.visibility = 'hidden';
    
              document.getElementById("p1").style.visibility = 'hidden';
              document.getElementById("p2").style.visibility = 'hidden';
              document.getElementById("p3").style.visibility = 'hidden';
    // return "submited";
                clearTimeout(timer);
              }
          }
     
         var timer =  setInterval(sec,1000);
      }
      
      counter();
    

    YUI().use(

      'aui-ace-editor',

      function (Y) {

        new
          Y.AceEditor(

            {

              boundingBox:
                '#myEditor1',

              mode:
                "java",




            }

          ).render();



      }

    );



    YUI().use(

      'aui-ace-editor',

      function (Y) {

        new
          Y.AceEditor(

            {

              boundingBox:
                '#myEditor2',

              mode:
                "java"



            }

          ).render();

      }

    );

    YUI().use(

      'aui-ace-editor',

      function (Y) {

        new
          Y.AceEditor(

            {

              boundingBox:
                '#myEditor3',

              mode:
                "java"



            }

          ).render();

      }

    );
    }

  

// }
//   async loadQuestions() {
//     await this.api.getQuestions(this.pemail,this.ptoken).subscribe(res => {
//       console.log(res);

//       for (let i in res) {
//         this.questions.push(res[i].question)
//       }
//       this.Question1 = this.questions[0];
//       this.Question2 = this.questions[1];
//       this.Question3 = this.questions[2];

//     }, err => {
//       console.log(err);
//     });
// }
// mySubmit() {

//   var a = (document.getElementById('myEditor1').innerText);
//   var b = (document.getElementById('myEditor2').innerText);
//   var c = (document.getElementById('myEditor3').innerText);
//   var data = { 'question1': this.Question1, 'answer1': a, 'question2': this.Question2, 'answer2': b, 'question3': this.Question3, 'answer3': c };
//   this.answerApi.postAnswers(JSON.stringify(data))
//     .subscribe(res => {

//     }, (err) => {
//       console.log(err);
//     })
// }


//   myStart() {
//     console.log("my start clicked");
//     YUI().use(
//       'aui-ace-editor',
//       function (Y) {
//         new Y.AceEditor(
//           {
//             boundingBox: '#myEditor1',
//             mode: "java",
            





  }
}





// }












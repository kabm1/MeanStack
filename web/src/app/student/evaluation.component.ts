import { AnswerServiceService } from './../services/answer-service.service';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styles: []
})
export class EvaluationComponent implements OnInit {

  myRowData = [];
  
  public gridOptions: GridOptions;
  constructor(private builder: FormBuilder, private ans: AnswerServiceService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "Question1",
        field: "question1",
        resizable: true,
        minWidth: 500
      },
      {
        headerName: "Answer1",
        field: "answer1",
        filter: true,
        editable: true
      },
      {
        headerName: "Question2",
        field: "question2",
        resizable: true,
        minWidth: 500
      },
      {
        headerName: "Answer2",
        field: "answer2",
        filter: true,
        editable: true
      },
      {
        headerName: "Question3",
        field: "question3",
        resizable: true,
        minWidth: 500
      },
      {
        headerName: "Answer3",
        field: "answer3",
        filter: true,
        editable: true
      }

    ];
    this.gridOptions.rowData = this.myRowData;
  }

  ngOnInit() {
    this.myRowData =[];
    this.ans.getAllAnswers().subscribe(res => {
      for (let i in res) {
        this.myRowData.push({ 'question1': res[i].question1, 'answer1': res[i].answer1,
                              'question2': res[i].question2, 'answer2': res[i].answer2,
                              'question3': res[i].question3, 'answer3': res[i].answer3  
                            });
      }
      this.gridOptions.api.setRowData(this.myRowData);
    }, err => {
      console.log(err);
    });
  }

  firstDataRendered(params) {
    params.api.sizeColumnsToFit();
}

}

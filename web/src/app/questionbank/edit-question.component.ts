import { QuestionServiceService } from './../services/question-service.service';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { FormBuilder } from '@angular/forms';

// import { DbServiceService } from '../services/db-service.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
})
export class EditQuestionComponent implements OnInit {
  myRowData = [];
  
  public gridOptions: GridOptions;
  constructor(private builder: FormBuilder, private ques: QuestionServiceService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "Question",
        field: "question",
        resizable: true,
        minWidth: 500
      },
      {
        headerName: "Active",
        field: "active",
        filter: true,
        editable: true
      },

    ];
    this.gridOptions.rowData = this.myRowData;
  }

  ngOnInit() {
    this.myRowData =[];
    this.ques.getAllQuestions().subscribe(res => {
      for (let i in res) {
        this.myRowData.push({ 'question': res[i].question, 'active': res[i].active });
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

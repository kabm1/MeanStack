import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  template: `    <button style="background: cyan" type="button" onclick="myStart(elem)">Start</button>
  `,
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  myStart(elem){
    var element = document.getElementById(elem);
  element.innerHTML = '<app-exam></app-exam>';
  
  }


}

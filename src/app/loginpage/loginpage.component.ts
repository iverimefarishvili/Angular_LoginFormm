import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  @Input('state') data: any;

  constructor() { }

  ngOnInit() {

   console.log(this.data)
   
  }

   



}

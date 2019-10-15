import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    idNumber: new FormControl('')
  });

  form2 = new FormGroup({
    email: new FormControl(''),
    phonenumber: new FormControl('')
  });

  form3 = new FormGroup({
    text: new FormControl(''),
    password: new FormControl('')
  });

  state = [
    [

    ],
    [

    ],
    [

    ]
  ];

  georgianAlphabet = ['ა','ბ','გ','დ','ე','ვ','ზ','თ','ი','კ','ლ','მ','ნ','ო','პ','ჟ','რ','ს','ტ','უ','ფ','ქ','ღ','ყ','შ','ჩ','ც','ძ','წ','ჭ','ხ','ჯ','ჰ']
  integers = [0,1,2,3,4,5,6,7,8,9]

  isSuitable = true;
  called = false;
  personalIsActive = true;
  contactIsActive = false;
  messageIsActive = false;
  
  
  constructor() { }

  ngOnInit() {
    
  }
  
  isGeorgian(event,element) {
    this.called = true;
    
    for(let i of event.target.value) {
      if(this.georgianAlphabet.includes(i)) {
        element.isSuitable = false;
      } else {
        element.isSuitable = true;
        event.target.value = '';
      }
    }
    console.log(this.isSuitable)
  }

  idNumberCheck(event, element) {
    console.log(event.target.type)
    for(let el of event.target.value) {
      console.log(el)
      if(this.integers.includes(parseInt(el))) {
        element.isSuitable = false;
      }else{
        element.isSuitable = true;
        event.target.value = '';
      }
    }
  }

  pushItem() {
    this.state[0] = [
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.idNumber
    ]
    this.state[1] = [
      this.form2.value.email,
      this.form2.value.phonenumber
    ]
    this.state[2] = [
      this.form3.value.text,
      this.form3.value.password
    ]
  }

  next() {
    this.pushItem();
    console.log(this.personalIsActive, this.contactIsActive, this.messageIsActive)
    if(this.personalIsActive) {
      if(this.form.value.firstName.length>0 && this.form.value.lastName.length >0 && this.form.value.idNumber > 0 && this.isSuitable) {
        this.contactIsActive = true;
        this.personalIsActive = false;
        return 0;
      }
      
    }
    if(this.contactIsActive) {
      this.contactIsActive = false;
      this.messageIsActive = true;
    }
  }

  back() {
    if(this.contactIsActive) {
      this.personalIsActive = true;
      this.contactIsActive = false;
      return 0;
    }
    if(this.messageIsActive) {
      this.messageIsActive = false;
      this.contactIsActive = true;
    }
  }
}

import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output } from '@angular/core';
import { FormControl, FormGroup } from 'app/node_modules/@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  state = {
    personal: {
      firstname: '',
      lastname: '',
      idnumber: ''
    },
    contact: {
      email: '',
      phonenumber: ''
    },
    message: {
      text: '',
      password: ''
    }
  };
  

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
   
  }

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


  isSuitable = true;
  called = false;
  error = '';
  timeless = false;
  onBlur = false;
  loginpageIsactive = false;
  personalIsActive = true;
  contactIsActive = false;
  messageIsActive = false;

  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('surname', {static: false}) surname: ElementRef;
  @ViewChild('idnumber', {static: false}) idnumber: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('phonenumber', {static: false}) phonenumber: ElementRef;


  @ViewChild('animation', {static: false}) animation: ElementRef;

  @ViewChild('textarea', {static: false}) textarea: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  @ViewChild("div1", {static: false}) div1: ElementRef;


  pushItem() {
    console.log("ifushebaaaa ? ")
    this.state.personal = {
      firstname: this.form.value.firstName,
      lastname: this.form.value.lastName,
      idnumber: this.form.value.idNumber
    }
    
    this.state.contact = {
      email: this.form2.value.email,
      phonenumber: this.form2.value.phonenumber
    }
    this.state.message = {
      text: this.form3.value.text,
      password: this.form3.value.password
    }
    
  }
  
  

  isGeorgian(event,element) {
    
    this.called = true;
    
    for(let char of event.target.value) {
      console.log(char);
      if(char.charCodeAt(0)<4304 || char.charCodeAt(0)>4347) {
        element.isSuitable = true;
        element.error = "შეიყვანეთ ქართული ასოები!"
        return 0;
      } else {
        element.isSuitable = false;
      }
    }
    console.log(this.isSuitable)
  }

  idNumberCheck(event, element) {
 
    for(let el of event.target.value) {
      
      if(el.charCodeAt(0)<48 || el.charCodeAt(0)>57) {
        
        element.isSuitable = true;
        element.error = "შეიყვანეთ მხოლოდ ციფრები!"
        return 0;
      }else{
        if(`${event.target.value}`.length <11){
          element.isSuitable = true;
          element.error = "პირადი ნომერი უნდა იყოს 11 ციფრისგან შემდგარი!"
        } else {
          element.isSuitable = false;
        }
               
      }
    }
    
  }

  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailCheck(element, event) {
    console.log(this.form2.value.email)
    if(this.re.test(event.target.value) ){
      element.isSuitable = false;
    } else {
      element.isSuitable = true;
      element.error = "იმეილის ფორმატი არ არის სწორი!"
    }

  }

  phone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g


  phoneCheck(event, element) {
    for(let el of event.target.value) {
      console.log(el.charCodeAt(0))
      if(el.charCodeAt(0)<48 || el.charCodeAt(0)>57) {
        
        element.isSuitable = true;
        element.error = "შეიყვანეთ მხოლოდ ციფრები!"
        return 0;
      }else{
        console.log()
        if(`${event.target.value}`.length <9){
          element.isSuitable = true;
          element.error = "მობილურის ნომერი უნდა იყოს 9 ციფრისგან შემდგარი!"
        } else {
          element.isSuitable = false;
        }
               
      }
    }
  }

  regularExpression =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  passwordcheck(event, element) {
    if(event.target.value.length<8){
      element.error = "პაროლი ძალიან მოკლეა!"
      element.isSuitable = true;
    } else{
      if(!this.regularExpression.test(event.target.value)) {
        element.error = "პაროლი უნდა შეიცავდეს მინიმუმ ერთ რიცხვს,ერთ დიდ ასოს და ერთ სიმბოლოს!"
        element.isSuitable = true;
      } else {
        element.isSuitable = false;
        this.retype();
      }
    }
  }

  
  k = 0;
  Animation() {
      //this.animation.nativeElement.setAttribute("[@slideInOut]");
     setTimeout(()=>{

      
        
        this.renderer.setStyle(
          this.animation.nativeElement, 
          'width', 
          `${this.k}%`
        );
        if(this.k<100) {
          this.k = this.k+0.05;
          this.Animation();
        } else {
          this.renderer.setStyle(
            this.animation.nativeElement, 
            'width', 
            `${0}%`
          );
          this.timeless = true;
        
        }
      },20)
      
      
    
    
  }

  
  retype(event?, password?) {
    
    if(this.password.nativeElement.value != event.target.value) {
      password.error = "პაროლები არ ემთქხვევა ერთმანეთს!"
      password.isSuitable = true;
    } else { 
      password.isSuitable = false;
    }
  }

  
  blurFunction(element) {
    element.onBlur = true;
  }

  focusFuncton(element) {
    element.onBlur = false;
  }

  onclick() {
    this.pushItem();

    
    if(this.personalIsActive) {
      if(this.form.value.firstName.length>0 && this.form.value.lastName.length >0 && `${this.form.value.idNumber}`.length > 0 ) {
        if(!this.name.nativeElement.isSuitable && !this.surname.nativeElement.isSuitable && !this.idnumber.nativeElement.isSuitable) {
          this.contactIsActive = true;
          this.personalIsActive = false;
          this.form.disable()
          this.div1.nativeElement.style.pointerEvents = 'none';
          return;
        }
      }
    }
    if(this.contactIsActive) {
    if(this.form2.value.email.length>0 && `${this.form2.value.phonenumber}`.length > 0 && this.form.disabled) {
        if(!this.email.nativeElement.isSuitable && !this.phonenumber.nativeElement.isSuitable) {
          this.form2.disable()
          this.contactIsActive = false;
          this.messageIsActive = true;
          this.Animation();
        
          
          return 0;
      }
    }
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

  register() {
    if((this.form.value.firstName.length>0 && this.form.value.lastName.length >0 && this.form.value.idNumber.length > 0 && this.form2.value.email.length>0 && this.form2.value.phonenumber.length > 0 && `${this.form3.value.text}`.length>0 && this.form3.value.password.length>0 )) {
       
      if(this.form.disabled && this.form2.disabled)  {
        this.loginpageIsactive = !this.loginpageIsactive;
        
      }
    }
  }
}

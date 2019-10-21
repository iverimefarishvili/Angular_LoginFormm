import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
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

  state = {
    personal: {

    },
    contact: {

    },
    message: {
      
    }
  };

  isSuitable = true;
  called = false;
  personalIsActive = true;
  contactIsActive = false;
  messageIsActive = false;
  loginpageIsactive = false;
  error = '';
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('surname', {static: false}) surname: ElementRef;
  @ViewChild('idnumber', {static: false}) idnumber: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('phonenumber', {static: false}) phonenumber: ElementRef;


  @ViewChild('animation', {static: false}) animation: ElementRef;

  @ViewChild('textarea', {static: false}) textarea: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    
  }


  @ViewChild("div1", {static: false}) div1: ElementRef;
  
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
    console.log(event.target.type)
    for(let el of event.target.value) {
      console.log(el.charCodeAt(0))
      if(el.charCodeAt(0)<48 || el.charCodeAt(0)>57) {
        
        element.isSuitable = true;
        element.error = "შეიყვანეთ მხოლოდ ციფრები!"
        return 0;
      }else{
        if(event.target.value.length<11) {
          
        }
        element.isSuitable = false;       
      }
    }
    console.log(element.isSuitable)
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


  phoneCheck(element, event) {
    if(this.phone.test(event.target.value)) {
      element.isSuitable = false;
    } else {
      element.isSuitable = true;
    }
  }
  passwordcheck(event, element) {
    if(event.target.value.length<8){
      element.error = "პაროლი ძალიან მოკლეა!"
      element.isSuitable = true;
    } else{
      element.isSuitable = false;
    }
  }

  pushItem() {
    this.state.personal = {
      'firstname': this.form.value.firstName,
      'lastname': this.form.value.lastName,
      'idnumber': this.form.value.idNumber
    }
    
    this.state.contact = {
      'email': this.form2.value.email,
      'phonenumber': this.form2.value.phonenumber
    }
    this.state.message = {
      'password': this.form3.value.password
    }
    
  }
  k = 0;
  Animation() {
    
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
          this.cancel();
        }
      },20)
      
      
    
    
  }

  


  next() {
    this.pushItem();
    console.log(this.form.value.firstName.isSuitable,this.form.value.lastName.isSuitable,this.form.value.idNumber.isSuitable)
    console.log(this.personalIsActive, this.contactIsActive, this.messageIsActive)
    
    
    if(this.personalIsActive) {
      if(this.form.value.firstName.length>0 && this.form.value.lastName.length >0 && this.form.value.idNumber > 0 ) {
        if(!this.name.nativeElement.isSuitable && !this.surname.nativeElement.isSuitable && !this.idnumber.nativeElement.isSuitable) {
          this.contactIsActive = true;
          this.personalIsActive = false;
          this.form.disable()
          //this.div1.nativeElement.style.pointerEvents = 'none';
          return 0;
        }
      }
    }
    if(this.contactIsActive) {
      if(this.form2.value.email.length>0 && this.form2.value.phonenumber.length > 0 ) {
        if(!this.email.nativeElement.isSuitable && !this.phonenumber.nativeElement.isSuitable) {
          this.form2.disable()
          this.contactIsActive = false;
          this.messageIsActive = true;
          this.Animation();
        
          
          return 0;
      }
    }
    }

    if(this.messageIsActive) {
      
      
    }

    
  }

  register() {
      if((this.form.value.firstName.length>0 && this.form.value.lastName.length >0 && this.form.value.idNumber.length > 0 && this.form2.value.email.length>0 && this.form2.value.phonenumber.length > 0 && this.form3.value.textarea.length>0 && this.form3.value.password.length>0)) {
        
        if(!this.name.nativeElement.isSuitable && !this.surname.nativeElement.isSuitable && !this.idnumber.nativeElement.isSuitable && !this.email.nativeElement.isSuitable && !this.phonenumber.nativeElement.isSuitable && !this.textarea.nativeElement.isSuitable && !this.password.nativeElement.isSuitable)  {
          this.loginpageIsactive = !this.loginpageIsactive;
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

  cancel() {
    window.location.reload();
  }
}

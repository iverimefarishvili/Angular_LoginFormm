import { Component, ElementRef, ViewChild, Renderer2, Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { EventEmitter } from 'events';
import { ChildComponent } from './child/child.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [

    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(0%)', opacity: 0.3}),
        animate('60000ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 0.4, 'width': "100%"}))
      ])
    ])
  ]
})
export class AppComponent {
  
  @ViewChild('child', {static: false}) child: ChildComponent;
  

  state = {
    personal: {

    },
    contact: {

    },
    message: {
      
    }
  };
  
  
  


  
  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    
  }


  
  
 

  next() {
    this.child.onclick();
  }

  register() {
      this.child.register(); 
  }

  back() {
    this.child.back();
  }

  cancel() {
    window.location.reload();
  }

  messageclick() {
    if(this.child.form.disabled && this.child.form2.disabled) {
      this.child.personalIsActive = false;
      this.child.messageIsActive = true;
      this.child.contactIsActive = false;
    }
  }
  contactclick() {
    if(this.child.form.disabled) {
      this.child.contactIsActive = true;
      this.child.messageIsActive = false;
      this.child.personalIsActive = false;
    }
  }
}

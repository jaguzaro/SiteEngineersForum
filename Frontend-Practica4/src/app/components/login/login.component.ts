import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import 'animate.css'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  container_login!: ElementRef;
  container_register!: ElementRef;

  login: boolean = true;
  register: boolean = false;
  forgotPassword: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.container_login = this.elementRef.nativeElement.querySelector('#container_login');
    this.container_register = this.elementRef.nativeElement.querySelector("#container_register");
  }

  showLogin(){
    this.register = false;
    this.login = true;
  }

  showRegister(){
    this.register = true;
    this.login = false;
  }

  showForgotPassword(){
    this.register = false;
    this.login = false;
    this.forgotPassword = true;
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'animate.css'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  container_login!: ElementRef;
  container_register!: ElementRef;

  login: boolean = true;
  register: boolean = false;
  forgotPassword: boolean = false;
  
  modelId: string = '';
  modelName: string ='';
  modelLastname: string = '';
  modelCarnet: string = '';
  modelEmail: string = '';
  modelPassword: string = '';
  modelCarnetPass: string = '';
  modelnewPass: string = '';
  
  


  constructor(private elementRef: ElementRef, private userService: UserService, private router: Router) {
  }

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

  async loginUser(){
    const res = await this.userService.getUser({"license": this.modelCarnet});
    if(res?.statusCode == 200){
      if(res?.data[0].password == this.modelPassword){
        sessionStorage.setItem("session", this.modelCarnet);
        this.router.navigateByUrl('/dashboard');
      }else{
        alert("Contraseña incorrecta");
      }
    }else{
      alert("Usuario no encontrado");
    }
    
  }
  async registerUser(){
    const body = {
        "name": this.modelName,
        "lastname": this.modelLastname,
        "email": this.modelEmail,
        "license": this.modelCarnet,
        "password": this.modelPassword}

        const res = await this.userService.registerUser(body);
        if(res?.statusCode == 200){
            alert(' Usuario creado correctamente')
        }else{
            alert('Error creating post')
        }
  }

  async updatePassword(){
    const body = {
      "carnet": this.modelCarnetPass,
      "password": this.modelnewPass
    }

    const res = await this.userService.updatePassword(body);
    if (res?.statusCode == 200){
      alert('Contraseña actualizada correctamente')
    }else{
      alert('Error actualizando contraseña')
    }
  }
  

  
}

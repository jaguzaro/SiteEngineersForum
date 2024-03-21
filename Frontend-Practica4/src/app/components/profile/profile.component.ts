import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  modelName: string = ''
  modelLastname: string = ''
  modelLicense: string = ''
  modelPassword: string = ''
  modelEmail: string = ''

  modelLicenseFind: string = ''

  modelNameF: string = ''
  modelLastnameF: string = ''
  modelLicenseF: string = ''
  modelEmailF: string = ''

  constructor(private userService: UserService){}

  async ngOnInit() {
    await this.getUser()
  }

  async getUser(){
    const body = {
      "license": sessionStorage.getItem('session')
    }

    const res = await this.userService.getUser(body);
    if(res?.statusCode == 200){
      this.modelName = res?.data[0]?.name
      this.modelLastname = res?.data[0]?.lastname
      this.modelLicense = res?.data[0]?.license
      this.modelEmail = res?.data[0]?.email
    }
  }

  async updateUser(){
    const body = {
      "name": this.modelName,
      "lastname": this.modelLastname,
      "license": this.modelLicense,
      "email": this.modelEmail,
    }

    const res = await this.userService.updateUser(body);
    if(res?.statusCode == 200){
      alert("Usuario actualizado")
    }else{
      alert("Usuario no actualizado")
    }
  }

  async findUser(){
    const body = {
      "license": this.modelLicenseFind
    }

    const res = await this.userService.getUser(body);
    if(res?.statusCode == 200){
      alert("Usuario encontrado")
      this.modelNameF = res?.data[0]?.name
      this.modelLastnameF = res?.data[0]?.lastname
      this.modelLicenseF = res?.data[0]?.license
      this.modelEmailF = res?.data[0]?.email
    }else{
      alert("Usuario no existe")
    }
  }
}

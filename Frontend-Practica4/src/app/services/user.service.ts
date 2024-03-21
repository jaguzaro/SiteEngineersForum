import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

  }
  urlBackend = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getUser(data: any): Promise<any> {
    const url = this.urlBackend + 'user/profile';
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  getUsers(): Promise<any> {
    const url = this.urlBackend + 'user/getUsers';
    return fetch(url, {
      method: 'GET',
      headers: this.headers,
      //body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }
  
  registerUser(data: any): Promise<any> {
    const url = this.urlBackend + 'user/registerUser';
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  updatePassword(data:any): Promise<any>{
    const url = this.urlBackend + 'user/update-password';
    return fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  updateUser(data:any): Promise<any>{
    const url = this.urlBackend + 'user/update-user';
    return fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }


}

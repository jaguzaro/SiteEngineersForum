import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

  }
  urlBackend = 'http://localhost:3000/'
  constructor() { }

  insertPost(data: any): Promise<any> {
    const url = this.urlBackend + 'posts/createPost';
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

  getPosts(): Promise<any>{
    const url = this.urlBackend + 'posts/getPosts';
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
}

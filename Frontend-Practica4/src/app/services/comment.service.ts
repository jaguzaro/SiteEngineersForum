import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

  }
  urlBackend = 'http://localhost:3000/'
  constructor() { }

  insertComment(data: any): Promise<any> {
    const url = this.urlBackend + 'comments/createComment';
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

  getComments(data: any): Promise<any> {
    const url = this.urlBackend + 'comments/getCommentsByPostId';
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
}

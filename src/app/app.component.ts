import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpResponseCache } from './http-response-cache';

@Component({
  selector: 'my-app',
  styles: ['p { font-family: Lato; }'],
  template: `
    User id:
    <input type="number" placeholder="id" [(ngModel)]="id" (keydown.enter)="makeRequest()"/><br>
    <button (click)="makeRequest()">make request</button>
    <button (click)="clearCache()">clear cache</button>
    <pre><code>{{response | json}}</code></pre>
  `,
})
export class AppComponent {
  id = 1;
  response = {};

  constructor(
    private http: HttpClient,
    private cache: HttpResponseCache // Injetando cache, não importa qual. O angular vai saber por meio do provider
  ) {}

  makeRequest() {
    this.response = { loading: true };
    this.http
      .get(`https://jsonplaceholder.typicode.com/users/${this.id}`, {
        params: { from_cache: 'true' }, // resposta do cache se disponivel
      })
      .subscribe((response) => {
        this.response = response;
        console.log('response 0 ', this.response);
        this.getRequest((resp) => {
          console.log('response 1 ', resp);
        });
        this.getRequest((resp) => {
          console.log('response 2 ', resp);
        });
        this.getRequest((resp) => {
          console.log('response 3 ', resp);
        });
        this.getRequest((resp) => {
          console.log('response 4 ', resp);
        });
      });
  }

  id2 = 1;
  getRequest(callback) {
    this.response = { loading: true };
    this.http
      .get(`https://jsonplaceholder.typicode.com/users/${this.id2}`, {
        params: { from_cache: 'true' }, // resposta do cache se disponivel
      })
      .subscribe((response) => {
        this.response = response;
        callback(response);
      });
  }

  clearCache() {
    this.cache.clear();
    alert('ok');
  }
}

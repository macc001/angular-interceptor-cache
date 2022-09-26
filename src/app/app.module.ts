import { FormsModule } from '@angular/forms';
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CacheInterceptorProvider } from './cache-interceptor';
import { InMemoryCacheProvider } from './http-response-cache-in-memory';
import { LocalStorageCacheProvider } from './http-response-cache-local-storage';


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    // Posso escolher qual implementaçao usar para a abstração do cache
    InMemoryCacheProvider,
    // LocalStorageCacheProvider,
  
    CacheInterceptorProvider,
  ]
})
export class AppModule { }

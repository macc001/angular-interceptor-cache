import { of } from 'rxjs';
import { tap, filter, delay } from 'rxjs/operators';
import { Injectable, Provider, InjectionToken } from '@angular/core';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpHandler, HttpResponse, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';

import { HttpResponseCache } from './http-response-cache';


@Injectable()
class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: HttpResponseCache) {} // programado para interface/classe abstrata

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.cache.has(request)) {
      console.log('> [Response from cache]');
      return of(this.cache.get(request));
    }
    console.log('> [Requesting...]')
    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap((response: HttpResponse<any>) => this.cache.set(request.urlWithParams, response)),
      delay(1000), // simulando uma request demorada
    );
  }
}

export const CacheInterceptorProvider: Provider = ({
  multi: true,
  provide: HTTP_INTERCEPTORS,
  useClass: CacheInterceptor,
});

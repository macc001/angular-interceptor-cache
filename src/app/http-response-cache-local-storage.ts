import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpResponseCache } from './http-response-cache';


@Injectable()
class HttpResponseCacheLocalStorage implements HttpResponseCache {
  private prefix = '__request_cache_';
  has(request: HttpRequest<any>) {
    return !!localStorage
      .getItem(`${this.prefix}${request.urlWithParams}`);
  }
  get(request: HttpRequest<any>) {
    const key = `${this.prefix}${request.urlWithParams}`;
    const item = localStorage.getItem(key);
    const parsedResponse = JSON.parse(item);
    const retorno = new HttpResponse({ body: parsedResponse });
    console.log(retorno)
    return retorno;
  }
  set(key: HttpRequest<any>['urlWithParams'], value: HttpResponse<any>) {
    const responseBody = JSON.stringify(value.body);
    localStorage.setItem(`${this.prefix}${key}`, responseBody);
  }
  clear() {
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);
      if (key && key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}


// Posso substituir por outra classe sem me preocupar com o inteceptor
export const LocalStorageCacheProvider = ({
  provide: HttpResponseCache,
  useClass: HttpResponseCacheLocalStorage,
});

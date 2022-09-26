import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpResponseCache } from './http-response-cache';


@Injectable()
class HttpResponseCacheInMemory implements HttpResponseCache {
  private store = {};
  has(request: HttpRequest<any>) {
    return request.method === 'GET' &&
      request.params.get('from_cache') === 'true' && /* Parametro da url necessario para pegar do cache */
      !!this.store[request.urlWithParams]; // A unica verificação desse método deveria ser essa linha, mas ok
  }
  get(request: HttpRequest<any>) {
    return this.store[request.urlWithParams];
  }
  set(key: HttpRequest<any>['urlWithParams'], value: HttpResponse<any>) {
    this.store[key] = value;
  }
  clear() {
    this.store = {};
  }
}

// Criando provider para indicar para o angular qual classe será usada como cache
// Poderia disponibilizar o interceptor como lib e deixar o cache ser implementado pelo usuario
// A classe padrão registra o cache em memoria, mas poderia registrar no locastorage por exemplo
export const InMemoryCacheProvider = ({
  provide: HttpResponseCache,
  useClass: HttpResponseCacheInMemory,
});

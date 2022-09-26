import { HttpRequest, HttpResponse } from '@angular/common/http';

// Abstração do cache
export abstract class HttpResponseCache {
  abstract has(request: HttpRequest<any>): boolean;
  abstract get(request: HttpRequest<any>): HttpResponse<any>;
  abstract set(key: HttpRequest<any>['urlWithParams'], value: HttpResponse<any>): void;
  abstract clear(): void;
}

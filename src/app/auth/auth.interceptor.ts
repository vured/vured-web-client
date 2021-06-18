import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const api = localStorage.getItem('api');
    const token = localStorage.getItem('token');

    request = request.clone({
      url: api + request.url,
      setHeaders: {
        'Access-Control-Allow-Origin': environment.appUrl,
        Version: '1'
      }
    });

    if (!token) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });

    console.log(request);

    return next.handle(request);
  }
}

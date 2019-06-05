import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Adal8Service } from './adal8.service';

@Injectable()
export class Adal8Interceptor implements HttpInterceptor {
    constructor(public adal8Service: Adal8Service) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.adal8Service.getToken()}`
            }
        });
        return next.handle(request);
    }
}

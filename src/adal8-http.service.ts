import { Observable } from 'rxjs/internal/Observable';
import { Adal8Service } from './adal8.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class Adal8HTTPService
 */
@Injectable()
export class Adal8HTTPService {

    /**
     * Creates an instance of Adal8HTTPService.
     * @param {HttpClient} http
     * @param {Adal8Service} service
     *
     * @memberOf Adal8HTTPService
     */
    constructor(
        private http: HttpClient,
        private service: Adal8Service
    ) {
    }

    /**
     *
     *
     * @static
     * @param {HttpClient} http
     * @param {Adal8Service} service
     *
     * @memberOf Adal8HTTPService
     */
    static factory(http: HttpClient, service: Adal8Service) {
        return new Adal8HTTPService(http, service);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    get(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('get', url, options);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    post(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('post', url, options);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    delete(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('delete', url, options);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    patch(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('patch', url, options);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    put(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('put', url, options);
    }

    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal8HTTPService
     */
    head(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('head', url, options);
    }

    /**
     *
     *
     * @private
     * @param {string} method
     * @param {string} url
     * @param {RequestOptionsArgs} options
     * @returns {Observable<string>}
     *
     * @memberOf Adal8HTTPService
     */
    private sendRequest(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {

        const resource = this.service.getResourceForEndpoint(url);
        let authenticatedCall: Observable<any>;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .pipe(
                        mergeMap((token: string) => {
                            if (options.headers == null) {
                                options.headers = new HttpHeaders();
                            }
                            options.headers = options.headers.append('Authorization', 'Bearer ' + token);
                            return this.http.request(method, url, options)
                                .pipe(
                                    catchError(this.handleError)
                                );
                        })
                    );
            } else {
                authenticatedCall = Observable.throw(new Error('User Not Authenticated.'));
            }
        } else {
            authenticatedCall = this.http.request(method, url, options)
                .pipe(
                    catchError(this.handleError)
                );
        }

        return authenticatedCall;
    }

    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal8HTTPService
     */
    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        const errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead

        return Observable.throw(error);
    }
}

# adal-angular8
![build status](https://travis-ci.org/Macadoshis/adal-angular5.svg?branch=master)

___

Angular 8+ Active Directory Authentication Library (ADAL) wrapper package. Can be used to authenticate Angular 8+ applications to Azure Active Directory.

Based on https://github.com/benbaran/adal-angular4.


## How to use it
> IMPORTANT!

Don't use `Http` and `HttpModule`, You definitely must use `HttpClient` and `HttpClientModule` instead of them.
The new interceptor is used only for request made by `HttpClient`.
When old `Http` used request will be untouched (no authorization header).

In `app.module.ts`

```typescript
import { HttpClient, HttpClientModule } from '@angular/common/http';
...
    imports: [..., HttpClientModule  ], // important! HttpClientModule replaces HttpModule
    providers: [
        Adal8Service,
        { provide: Adal8HTTPService, useFactory: Adal8HTTPService.factory, deps: [HttpClient, Adal8Service] } //  // important! HttpClient replaces Http
  ]
```

## Example

```typescript
import { Adal8HTTPService, Adal8Service } from 'adal-angular8';
...
export class HttpService {
    constructor(
        private adal8HttpService: Adal8HTTPService,
        private adal8Service: Adal8Service) { }

public get(url: string): Observable<any> {
        const options = this.prepareOptions();
        return this.adal8HttpService.get(url, options)
    }
    
private prepareOptions():any{
 let headers = new HttpHeaders();
        headers = headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.adal8Service.userInfo.token}`);
        return { headers };
}
```        

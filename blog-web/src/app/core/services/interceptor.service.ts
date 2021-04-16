import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.replace('http://', 'http://');
    const setHeader = {
      'X-CSRFToken': this.cookieService.get('csrf_token')
    };

    return next.handle(req.clone({
      setHeaders: setHeader,
      url
    })).pipe(
      catchError((error) => this.handleError(this, url, error))
    );
  }
  handle() {

  }
  handleError(that, url: string, error: HttpResponseBase): Observable<any> {
    console.log(error);
    switch (error.status) {
      case 401:
        // console.log(222);
        // that.router.navigate(['/login']);
        that.authService.loginOut();
        break;
    }

    return throwError(error);
  }
}

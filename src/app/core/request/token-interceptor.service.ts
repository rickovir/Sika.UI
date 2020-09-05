import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor{
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(public authService:AuthService, private router: Router){}
    
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> | any
    {
        return next.handle(request).pipe(
            catchError(
                error => {
                    if(error instanceof HttpErrorResponse){
                        if(error.status === 401)
                        {
                            return this.handle401Error(request,next);
                        }
                        else
                        {
                            return throwError(error);
                        }
                    }
                }
            )
        )
    }
    
    private handle401Error(request:HttpRequest<any>, next:HttpHandler)
    {
        const state: RouterStateSnapshot = this.router.routerState.snapshot;
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
    
          // Reset here so that the following requests wait until the token
          // comes back from the refreshToken call.
          this.tokenSubject.next(null);
    
          return this.authService.refreshToken().pipe(
            switchMap(data => {
              const response = <any>data;
              this.tokenSubject.next(response.accessToken);
    
              localStorage.setItem('accessToken', response.accessToken);
    
              const httpHeaders = new HttpHeaders({
                'Content-Type': request.headers.get('Content-Type'),
                'Authorization': `Bearer ${this.tokenSubject.value}`
              });
    
              return next.handle(request.clone({
                headers: httpHeaders
              }));
            }),
            catchError(error => {
              return <any>this.authService.logout(state);
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            })
          );
    
        } else {
          this.isRefreshingToken = false;
    
          const httpHeaders = new HttpHeaders({
            'Content-Type': request.headers.get('Content-Type'),
            'Authorization': `Bearer ${this.tokenSubject.value}`
          });
    
          return next.handle(request.clone({
            headers: httpHeaders
          }));
        }
    }
}
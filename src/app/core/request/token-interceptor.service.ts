import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor{
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
                            console.log('error !!!!!');
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
        const token = localStorage.getItem('token');

        if (token !== undefined && token !== '' && token !== null) {
            const httpHeaders = new HttpHeaders({
                'accept' : '*/*',
                'Content-Type': request.headers.get('Content-Type'),
                'Authorization': `Bearer ${token}`
            });
    
            return next.handle(request.clone({
                headers: httpHeaders
            }));
        }

        if (token == null || token == undefined || token == '') {
            return <any>this.authService.logout(state);
        }
    }
}
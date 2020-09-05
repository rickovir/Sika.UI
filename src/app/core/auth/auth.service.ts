import { Injectable } from "@angular/core";
import { IAppService } from '../../config/models/master.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserLogin, JwtToken } from '../../config/models/auth.model';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class AuthService implements IAppService{
    
    private currentUserSubject:BehaviorSubject<string>;

    protected stateSubject:BehaviorSubject<string>;
    currentState$:Observable<string>;

    protected loadingSubject:BehaviorSubject<boolean>;
    loading$:Observable<boolean>

    serviceUri:string;
    defaultHeader:HttpHeaders;

    constructor(
        private http:HttpClient,
        private router:Router
    ){
        this.stateSubject = new BehaviorSubject<string>('');
        this.currentState$ = this.stateSubject.asObservable();

        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading$ = this.loadingSubject.asObservable();

        this.serviceUri = `${environment.apiUrl}/auth`;
        this.defaultHeader = new HttpHeaders({
          'Content-Type': 'application/json'
        });

    }

    setLoading(loading:boolean)
    {
        this.loadingSubject.next(loading);
    }

    setState(state:string)
    {
        this.stateSubject.next(state);
    }

    login(user:UserLogin)
    {
        return this.http.post(`${this.serviceUri}/login`, user, {headers:this.defaultHeader})
        .pipe(switchMap(
            (response:JwtToken)=>{
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                return of('');
            }),
            catchError(
                (error)=>{
                    return of(error);
                }
            ));
    }

    refreshToken()
    {
        const refreshToken = localStorage.getItem('refreshToken');

        return this.http.get(`${this.serviceUri}/generateToken?refreshToken=${refreshToken}`, {headers:this.defaultHeader});
    }

    logout(state: RouterStateSnapshot = null) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    
        if (state === null) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
    }
}
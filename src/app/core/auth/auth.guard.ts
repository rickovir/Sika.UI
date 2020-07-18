import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        private authService:AuthService
    ){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean
    {
        const token = localStorage.getItem('token');

        if (token !== undefined && token !== '' && token !== null) {
            return true;
        }

        if (token == null || token == undefined || token == '') {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
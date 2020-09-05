import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from '../../config/models/auth.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponent {
  username:string = "";
  password:string = "";
  
  returnUrl:string;

  constructor(protected authService:AuthService,
              private router:Router,
              private activatedRoute:ActivatedRoute){
    super(authService);

    this.activatedRoute.params.subscribe(
      params=>{
        const type = <string>params['type'];
        if(type === 'logout'){
          this.authService.logout();
        }
      }
    )
  }

  submit()
  {
    this.authService.setLoading(true);
    const payload:UserLogin = {
      username:this.username,
      password:this.password
    };
    this.authService.login(payload).subscribe(
      ()=>{
        this.authService.setLoading(false);
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([this.returnUrl]);
      },
      error=>{
        this.authService.setLoading(false);
        if (error.status === 400) {
          console.log(error.error);
          this.password = '';
        }
      }
    )
  }
}

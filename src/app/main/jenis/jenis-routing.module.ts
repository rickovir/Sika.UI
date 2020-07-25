import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JenisComponent } from './jenis.component';
import { AuthGuard } from '../../core/auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:JenisComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JenisRoutingModule { }

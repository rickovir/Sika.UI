import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PemasukanComponent } from './pemasukan.component';
import { AuthGuard } from '../../core/auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:PemasukanComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PemasukanRoutingModule { }

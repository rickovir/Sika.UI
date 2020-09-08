import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PemasukanComponent } from './pemasukan.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  {
    path:'',
    component:PemasukanComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Daftar Pemasukan'
    }
  },
  {
    path:'add',
    component:CreateComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Tambah Pemasukan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PemasukanRoutingModule { }

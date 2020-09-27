import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PemasukanComponent } from './pemasukan.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';


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
  },
  {
    path:'view/:id',
    component:ViewComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'View Pemasukan'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PemasukanRoutingModule { }

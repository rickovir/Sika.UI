import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JenisComponent } from './jenis.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path:'',
    component:JenisComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Daftar Jenis'
    }
  },
  {
    path:'add',
    component:CreateComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Tambah Jenis'
    }
  },
  {
    path:'view/:id',
    component:ViewComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'View Jenis'
    }
  },
  {
    path:'edit/:id',
    component:EditComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'View Jenis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JenisRoutingModule { }

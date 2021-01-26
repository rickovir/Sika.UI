import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PengeluaranComponent } from './pengeluaran.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {
    path:'',
    component:PengeluaranComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Daftar Pengeluaran'
    }
  },
  {
    path:'add',
    component:CreateComponent,
    canActivate:[AuthGuard],
    data:{
      title:'Tambah Data Pengeluaran'
    }
  },
  {
    path:'edit/:id',
    component:EditComponent,
    canActivate:[AuthGuard],
    data:{
      title:'Ubah Data Pengeluaran'
    }
  },
  {
    path:'view/:id',
    component:ViewComponent,
    canActivate:[AuthGuard],
    data:{
      title:'Lihat Data Pengeluaran'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengeluaranRoutingModule { }

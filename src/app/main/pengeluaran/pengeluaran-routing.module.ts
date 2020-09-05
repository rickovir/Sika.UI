import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PengeluaranComponent } from './pengeluaran.component';
import { AuthGuard } from '../../core/auth/auth.guard';


const routes: Routes = [
  {
    path:'',
    component:PengeluaranComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Daftar Pengeluaran'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengeluaranRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CashFlowComponent } from './cash-flow.component';


const routes: Routes = [
  {
    path:'',
    component:CashFlowComponent,
    canActivate:[AuthGuard],
    data: {
      title: 'Daftar Arus Kas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashFlowRoutingModule { }

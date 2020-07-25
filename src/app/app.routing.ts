import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

import { P404Component } from './main/error/404.component';
import { P500Component } from './main/error/500.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadChildren: ()=>import('./main/login/login.module').then(m=>m.LoginModule),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // Dev kita   

      {
        path:'jenis',
        loadChildren:()=>import('./main/jenis/jenis.module').then(m=>m.JenisModule)
      },
      {
        path:'pemasukan',
        loadChildren:()=>import('./main/pemasukan/pemasukan.module').then(m=>m.PemasukanModule)
      },
      {
        path:'pengeluaran',
        loadChildren:()=>import('./main/pengeluaran/pengeluaran.module').then(m=>m.PengeluaranModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

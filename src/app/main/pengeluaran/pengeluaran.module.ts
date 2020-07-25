import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengeluaranRoutingModule } from './pengeluaran-routing.module';
import { PengeluaranComponent } from './pengeluaran.component';
import { PengeluaranService } from './pengeluaran.service';


@NgModule({
  declarations: [
    PengeluaranComponent
  ],
  imports: [
    CommonModule,
    PengeluaranRoutingModule
  ],
  providers:[
    PengeluaranService
  ],
  entryComponents:[
    PengeluaranComponent
  ]
})
export class PengeluaranModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengeluaranRoutingModule } from './pengeluaran-routing.module';
import { PengeluaranComponent } from './pengeluaran.component';
import { PengeluaranService } from './pengeluaran.service';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    PengeluaranComponent
  ],
  imports: [
    CommonModule,
    PengeluaranRoutingModule,
    ShareModule
  ],
  providers:[
    PengeluaranService
  ],
  entryComponents:[
    PengeluaranComponent
  ]
})
export class PengeluaranModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PemasukanRoutingModule } from './pemasukan-routing.module';
import { PemasukanComponent } from './pemasukan.component';
import { PemasukanService } from './pemasukan.service';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    PemasukanComponent
  ],
  imports: [
    CommonModule,
    PemasukanRoutingModule,
    ShareModule
  ],
  providers:[
    PemasukanService
  ],
  entryComponents:[
    PemasukanComponent
  ]
})
export class PemasukanModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JenisRoutingModule } from './jenis-routing.module';
import { JenisComponent } from './jenis.component';
import { JenisService } from './jenis.service';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    JenisComponent
  ],
  imports: [
    CommonModule,
    JenisRoutingModule,
    ShareModule
  ],
  providers:[
    JenisService,
  ],
  entryComponents:[
    JenisComponent
  ],
})
export class JenisModule { }

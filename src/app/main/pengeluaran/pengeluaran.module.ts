import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengeluaranRoutingModule } from './pengeluaran-routing.module';
import { PengeluaranComponent } from './pengeluaran.component';
import { PengeluaranService } from './pengeluaran.service';
import { ShareModule } from '../../share/share.module';
import { FormComponent } from './form/form.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { JenisService } from '../jenis/jenis.service';


@NgModule({
  declarations: [
    PengeluaranComponent,
    FormComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    PengeluaranRoutingModule,
    ShareModule
  ],
  providers:[
    PengeluaranService,
    JenisService
  ],
  entryComponents:[
    PengeluaranComponent
  ]
})
export class PengeluaranModule { }

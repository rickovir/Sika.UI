import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PemasukanRoutingModule } from './pemasukan-routing.module';
import { PemasukanComponent } from './pemasukan.component';
import { PemasukanService } from './pemasukan.service';
import { ShareModule } from '../../share/share.module';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { CreateComponent } from './create/create.component';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { JenisService } from '../jenis/jenis.service';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    PemasukanComponent,
    ViewComponent,
    FormComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PemasukanRoutingModule,
    ShareModule,
    AutoCompleteModule
  ],
  providers:[
    PemasukanService,
    JenisService
  ],
  entryComponents:[
    PemasukanComponent
  ]
})
export class PemasukanModule { }

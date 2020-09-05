import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JenisRoutingModule } from './jenis-routing.module';
import { JenisComponent } from './jenis.component';
import { JenisService } from './jenis.service';
import { ShareModule } from '../../share/share.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    JenisComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
    FormComponent
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

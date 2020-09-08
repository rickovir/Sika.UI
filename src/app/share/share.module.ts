import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from './loader/loader.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ErrorAlertModule } from './error-alert/error-alert.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    FormsModule,
    LoaderModule,
    ErrorAlertModule,
    TableModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports:[
    AlertModule,
    FormsModule,
    LoaderModule,
    TableModule,
    ErrorAlertModule,
    TooltipModule,
    BsDatepickerModule
  ]
})
export class ShareModule { }

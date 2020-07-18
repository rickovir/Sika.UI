import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from './loader/loader.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoaderModule,
    TableModule,
  ],
  exports:[
    FormsModule,
    LoaderModule,
    TableModule
  ]
})
export class ShareModule { }

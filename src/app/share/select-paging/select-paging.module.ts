import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectPagingComponent } from './select-paging.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SelectPagingComponent,
  ],
  exports: [
    SelectPagingComponent,
  ],
})
export class SelectPagingModule { }

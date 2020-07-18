import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ShareModule
  ],
  providers:[
    CategoryService
  ],
  entryComponents:[
    CategoryComponent
  ]
})
export class CategoryModule { }

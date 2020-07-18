import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseComponent implements OnInit {
  @ViewChild('tableCategory') table: Table;

  listCategory:Category[] = [];

  constructor(protected categoryService:CategoryService) {
    super(categoryService)
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (data:Category[])=>{
        this.listCategory = data;
      },
      error=>{
        console.log(error);
      }
    )
  }

}

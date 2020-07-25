import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { JenisService } from './jenis.service';
import {Jenis, JenisPageQuery} from './jenis.model';
import {Table} from 'primeng/table';
import { IPagedResult } from '../../config/models/master.model';

@Component({
  selector: 'app-jenis',
  templateUrl: './jenis.component.html',
  styleUrls: ['./jenis.component.css']
})
export class JenisComponent extends BaseComponent implements OnInit {
  @ViewChild('tableJenis') table: Table;

  listJenis:Jenis[] = [];
  pageQuery:JenisPageQuery = new JenisPageQuery();
  totalRecords:number=0;

  constructor(protected jenisService:JenisService) {
    super(jenisService);
  }

  ngOnInit(): void {
    
  }

  getList()
  {
    this.jenisService.getListWithPaging(this.pageQuery)
    .subscribe(
      (data:IPagedResult)=>{
        this.listJenis = data.data;
        this.totalRecords = data.totalRecords;
      }
    )
  }

  loadData(event) {
    this.pageQuery.page = event.first / this.pageQuery.itemsPerPage + 1;
    this.pageQuery.itemsPerPage = event.rows;
    this.pageQuery.field = event.sortField;
    this.pageQuery.order = event.sortOrder;

    this.getList();
  }

}

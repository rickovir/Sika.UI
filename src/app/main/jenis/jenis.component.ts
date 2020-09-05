import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../core/base/base.component';
import { JenisService } from './jenis.service';
import {Jenis, JenisPageQuery} from './jenis.model';
import {Table} from 'primeng/table';
import { IPagedResult } from '../../config/models/master.model';
import { PageQueryHistoryService } from '../../core/common/page-query-history.service';
import Swal from 'sweetalert2';
import { error } from 'protractor';

@Component({
  selector: 'app-jenis',
  templateUrl: './jenis.component.html',
  styleUrls: ['./jenis.component.css']
})
export class JenisComponent extends BaseComponent implements OnInit {
  @ViewChild('tableJenis') table: Table;
  errors:string[] = [];

  listJenis:Jenis[] = [];
  pageQuery:JenisPageQuery = new JenisPageQuery();
  totalRecords:number=0;
  firstNum: number=0;

  constructor(protected jenisService:JenisService, private pageQueryHistoryService:PageQueryHistoryService, private router:Router) {
    super(jenisService);
    this.jenisService.setLoading(true);

    //set current query
    this.pageQueryHistoryService.setCurrentState(this.router.url, this.pageQuery, 
      (data)=>{
        this.firstNum = (data.page -1) * data.itemsPerPage;
        this.pageQuery = <JenisPageQuery>data;
      });
  }

  ngOnInit(): void {
  }

  searchSortData(){
    this.pageQuery.page = 1;

    this.getList();
  }

  getList()
  {
    this.jenisService.setLoading(true);

    // this is run in first load
    this.pageQueryHistoryService.recordChanges(this.pageQuery, (data)=>{
      this.pageQuery = <JenisPageQuery>data;
    });

    this.jenisService.getListWithPaging(this.pageQuery)
    .subscribe(
      (data:IPagedResult)=>{
        this.listJenis = data.data;
        this.totalRecords = data.totalRecords;
        this.jenisService.setLoading(false);
      },
      (error)=>
      {
        console.error('error', error);
        this.jenisService.setLoading(false);
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

  reset() {
    //reset pagequeryfrom parent
    this.pageQueryHistoryService.reset(); 

    this.table.sortField = '';
    this.table.sortOrder = 0;
    this.table.first = 0;

    this.pageQuery = new JenisPageQuery();

    this.table.reset();
  }

  delete(id)
  {
    Swal.fire({
      title: 'Apakah yakin ingin menghapus data ?',
      text: "Data yang sudah dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText:'Tidak'
    }).then((result) => {
      if (result.value) {
        this.jenisService.setLoading(true);

        this.jenisService.delete(id).subscribe(
          ()=>{
            this.jenisService.setLoading(false);
            this.getList();
            
            Swal.fire(
            'Terhapus!',
            'Data berhasil dihapus.',
            'success'
            );
          },
          (error)=>{
            this.jenisService.setLoading(false);
            Swal.fire(
              'Gagal!',
              'Data gagal dihapus.',
              'error'
              );
            this.errors = error;
          })
        
      }
    })
  }

}

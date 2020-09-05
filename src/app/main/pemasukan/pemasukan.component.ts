import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { PemasukanService } from './pemasukan.service';
import { PageQueryHistoryService } from '../../core/common/page-query-history.service';
import { Router } from '@angular/router';
import { PemasukanPageQuery, Pemasukan } from './pemasukan.model';
import { Table } from 'primeng/table';
import { IPagedResult } from '../../config/models/master.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pemasukan',
  templateUrl: './pemasukan.component.html',
  styleUrls: ['./pemasukan.component.css']
})
export class PemasukanComponent extends BaseComponent implements OnInit {
  @ViewChild('tablePemasukan') table: Table;
  errors:string[] = [];

  listPemasukan:Pemasukan[] = [];
  totalRecords:number=0;
  firstNum: number=0;

  pageQuery:PemasukanPageQuery = new PemasukanPageQuery();

  constructor(protected pemasukanService:PemasukanService, private pageQueryHistoryService:PageQueryHistoryService, private router:Router) {
    super(pemasukanService);

    this.pageQueryHistoryService.setCurrentState(this.router.url, this.pageQuery, 
      (data)=>{
        this.firstNum = (data.page -1) * data.itemsPerPage;
        this.pageQuery = <PemasukanPageQuery>data;
      });
  }

  ngOnInit(): void {
  }

  getList()
  {
    this.pemasukanService.setLoading(true);

    // this is run in first load
    this.pageQueryHistoryService.recordChanges(this.pageQuery, (data)=>{
      this.pageQuery = <PemasukanPageQuery>data;
    });

    this.pemasukanService.getListWithPaging(this.pageQuery)
    .subscribe(
      (data:IPagedResult)=>{
        this.listPemasukan = data.data;
        this.totalRecords = data.totalRecords;
        this.pemasukanService.setLoading(false);
      },
      (error)=>
      {
        console.error('error', error);
        this.pemasukanService.setLoading(false);
      }
    )
  }
  
  searchSortData(){
    this.pageQuery.page = 1;

    this.getList();
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

    this.pageQuery = new PemasukanPageQuery();

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
        this.pemasukanService.setLoading(true);

        this.pemasukanService.delete(id).subscribe(
          ()=>{
            this.pemasukanService.setLoading(false);
            this.getList();
            
            Swal.fire(
            'Terhapus!',
            'Data berhasil dihapus.',
            'success'
            );
          },
          (error)=>{
            this.pemasukanService.setLoading(false);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { PengeluaranService } from './pengeluaran.service';
import { Table } from 'primeng/table';
import { Pengeluaran, PengeluaranPageQuery } from './pengeluaran.model';
import { PageQueryHistoryService } from '../../core/common/page-query-history.service';
import { Router } from '@angular/router';
import { IPagedResult } from '../../config/models/master.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.component.html',
  styleUrls: ['./pengeluaran.component.css']
})
export class PengeluaranComponent extends BaseComponent implements OnInit {
  @ViewChild('tablePengeluaran') table: Table;
  errors:string[] = [];

  listPengeluaran:Pengeluaran[] = [];
  totalRecords:number=0;
  firstNum: number=0;

  pageQuery:PengeluaranPageQuery = new PengeluaranPageQuery();

  constructor(protected pengeluaranService:PengeluaranService, private pageQueryHistoryService:PageQueryHistoryService, private router:Router) {
    super(pengeluaranService);

    this.pageQueryHistoryService.setCurrentState(this.router.url, this.pageQuery, 
      (data)=>{
        this.firstNum = (data.page -1) * data.itemsPerPage;
        this.pageQuery = <PengeluaranPageQuery>data;
      });
  }

  ngOnInit(): void {
    this.pengeluaranService.setLoading(true);
  }

  getList()
  {
    this.pengeluaranService.setLoading(true);

    // this is run in first load
    this.pageQueryHistoryService.recordChanges(this.pageQuery, (data)=>{
      this.pageQuery = <PengeluaranPageQuery>data;
    });

    this.pengeluaranService.getListWithPaging(this.pageQuery)
    .subscribe(
      (data:IPagedResult)=>{
        this.listPengeluaran = data.data;
        this.totalRecords = data.totalRecords;
        this.pengeluaranService.setLoading(false);
      },
      (error)=>
      {
        console.error('error', error);
        this.pengeluaranService.setLoading(false);
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

    this.pageQuery = new PengeluaranPageQuery();

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
        this.pengeluaranService.setLoading(true);

        this.pengeluaranService.delete(id).subscribe(
          ()=>{
            this.pengeluaranService.setLoading(false);
            this.getList();
            
            Swal.fire(
            'Terhapus!',
            'Data berhasil dihapus.',
            'success'
            );
          },
          (error)=>{
            this.pengeluaranService.setLoading(false);
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

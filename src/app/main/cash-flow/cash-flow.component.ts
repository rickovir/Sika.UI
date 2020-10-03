import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { IPagedResult } from '../../config/models/master.model';
import { BaseComponent } from '../../core/base/base.component';
import { PageQueryHistoryService } from '../../core/common/page-query-history.service';
import { CashFlow, CashFlowPageQuery } from './cash-flow.model';
import { CashFlowService } from './cash-flow.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent extends BaseComponent implements OnInit {
  @ViewChild('tableCashFlow') table: Table;
  errors:string[] = [];

  listPemasukan:CashFlow[] = [];
  totalRecords:number=0;
  firstNum: number=0;

  pageQuery:CashFlowPageQuery = new CashFlowPageQuery();

  constructor(protected cashFlowService:CashFlowService, private pageQueryHistoryService:PageQueryHistoryService, private router:Router) {
    super(cashFlowService);

    this.pageQueryHistoryService.setCurrentState(this.router.url, this.pageQuery, 
      (data)=>{
        this.firstNum = (data.page -1) * data.itemsPerPage;
        this.pageQuery = <CashFlowPageQuery>data;
      });
  }

  ngOnInit(): void {
    this.cashFlowService.setLoading(true)
  }

  getList()
  {
    this.cashFlowService.setLoading(true);

    // this is run in first load
    this.pageQueryHistoryService.recordChanges(this.pageQuery, (data)=>{
      this.pageQuery = <CashFlowPageQuery>data;
    });

    this.cashFlowService.getListWithPaging(this.pageQuery)
    .subscribe(
      (data:IPagedResult)=>{
        this.listPemasukan = data.data;
        this.totalRecords = data.totalRecords;
        this.cashFlowService.setLoading(false);
      },
      (error)=>
      {
        console.error('error', error);
        this.cashFlowService.setLoading(false);
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

    this.pageQuery = new CashFlowPageQuery();

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
        this.cashFlowService.setLoading(true);

        this.cashFlowService.delete(id).subscribe(
          ()=>{
            this.cashFlowService.setLoading(false);
            this.getList();
            
            Swal.fire(
            'Terhapus!',
            'Data berhasil dihapus.',
            'success'
            );
          },
          (error)=>{
            this.cashFlowService.setLoading(false);
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

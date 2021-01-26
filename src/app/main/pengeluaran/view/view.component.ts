import { Component, OnInit } from '@angular/core';
import { PengeluaranService } from '../pengeluaran.service';
import { ActivatedRoute } from '@angular/router';
import { PengeluaranFormData } from '../pengeluaran.model';
import { BaseComponent } from '../../../core/base/base.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ]
})
export class ViewComponent extends BaseComponent implements OnInit {
  dataPengeluaran:PengeluaranFormData = new PengeluaranFormData();
  errors:string[] = [];

  constructor(private pengeluaranService:PengeluaranService, private activatedRoute:ActivatedRoute) {
    super(pengeluaranService);
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.loadData(id);
  }

  loadData(id:number)
  {
    this.pengeluaranService.getById(id).toPromise().then(
      (data:PengeluaranFormData)=>{
        this.dataPengeluaran = data;

        this.pengeluaranService.setData(this.dataPengeluaran);
      },
      (error)=>{
        this.errors = error;
      }
    )
  }

}

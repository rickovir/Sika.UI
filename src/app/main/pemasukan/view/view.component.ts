import { Component, OnInit } from '@angular/core';
import { PemasukanService } from '../pemasukan.service';
import { ActivatedRoute } from '@angular/router';
import { PemasukanFormData } from '../pemasukan.model';
import { BaseComponent } from '../../../core/base/base.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ]
})
export class ViewComponent extends BaseComponent implements OnInit {
  dataPemasukan:PemasukanFormData = new PemasukanFormData();
  errors:string[] = [];

  constructor(private pemasukanService:PemasukanService, private activatedRoute:ActivatedRoute) {
    super(pemasukanService);
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.loadData(id);
  }

  loadData(id:number)
  {
    this.pemasukanService.getById(id).toPromise().then(
      (data:PemasukanFormData)=>{
        this.dataPemasukan = data;

        this.pemasukanService.setData(this.dataPemasukan);
      },
      (error)=>{
        this.errors = error;
      }
    )
  }

}

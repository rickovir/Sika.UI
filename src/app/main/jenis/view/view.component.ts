import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JenisService } from '../jenis.service';
import { JenisFormData } from '../jenis.model';
import { BaseComponent } from '../../../core/base/base.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ]
})
export class ViewComponent extends BaseComponent implements OnInit {
  dataJenis:JenisFormData = new JenisFormData();
  errors:string[] = [];

  constructor(private activatedRoute:ActivatedRoute, private jenisService:JenisService) {
    super(jenisService);
    
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.loadData(id);
  }

  ngOnInit(): void {
  }

  loadData(id:number)
  {
    this.jenisService.getById(id).toPromise().then(
      (data:JenisFormData)=>{
        this.dataJenis = data;
      },
      (error)=>{
        this.errors = error;
      }
    )
  }

}

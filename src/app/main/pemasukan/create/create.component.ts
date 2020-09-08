import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { PemasukanService } from '../pemasukan.service';
import { PemasukanFormData } from '../pemasukan.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent extends BaseComponent implements OnInit {
  dataPemasukan:PemasukanFormData = new PemasukanFormData();
  errors:string[] = [];

  constructor(private pemasukanService:PemasukanService) {
    super(pemasukanService);
  }

  ngOnInit(): void {
  }

  sendCreateData(event)
  {
    this.pemasukanService.setLoading(false);
    console.log(event)
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { PemasukanService } from './pemasukan.service';

@Component({
  selector: 'app-pemasukan',
  templateUrl: './pemasukan.component.html',
  styleUrls: ['./pemasukan.component.css']
})
export class PemasukanComponent extends BaseComponent implements OnInit {

  constructor(protected pemasukanService:PemasukanService) {
    super(pemasukanService)
  }

  ngOnInit(): void {
  }

}

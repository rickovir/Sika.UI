import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { PengeluaranService } from './pengeluaran.service';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.component.html',
  styleUrls: ['./pengeluaran.component.css']
})
export class PengeluaranComponent extends BaseComponent implements OnInit {

  constructor(protected pengeluaranService:PengeluaranService) {
    super(pengeluaranService)
  }

  ngOnInit(): void {
  }

}

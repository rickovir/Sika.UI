import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { PengeluaranService } from '../pengeluaran.service';
import { PengeluaranFormData } from '../pengeluaran.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent extends BaseComponent implements OnInit {
  dataPengeluaran:PengeluaranFormData = new PengeluaranFormData();
  errors:string[] = [];

  constructor(private pengeluaranService:PengeluaranService, private router:Router) {
    super(pengeluaranService);
    this.pengeluaranService.setData(new PengeluaranFormData());
  }

  ngOnInit(): void {
  }

  sendCreateData(event)
  {
    this.pengeluaranService.post(event).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil menambahkan Pengeluaran'
        })
        this.pengeluaranService.setLoading(false);
        this.router.navigate(['/pengeluaran']);
      },
      (error)=>{
        this.errors = error;
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { PemasukanService } from '../pemasukan.service';
import { PemasukanFormData } from '../pemasukan.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent extends BaseComponent implements OnInit {
  dataPemasukan:PemasukanFormData = new PemasukanFormData();
  errors:string[] = [];

  constructor(private pemasukanService:PemasukanService, private router:Router) {
    super(pemasukanService);
    this.pemasukanService.setData(new PemasukanFormData());
  }

  ngOnInit(): void {
  }

  sendCreateData(event)
  {
    this.pemasukanService.post(event).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil menambahkan Pemasukan'
        })
        this.pemasukanService.setLoading(false);
        this.router.navigate(['/pemasukan']);
      },
      (error)=>{
        this.errors = error;
      }
    )
  }
}

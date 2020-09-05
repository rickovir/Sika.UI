import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { JenisService } from '../jenis.service';
import { JenisFormData } from '../jenis.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})
export class CreateComponent extends BaseComponent implements OnInit {
  dataJenis:JenisFormData = new JenisFormData();
  errors:string[] = [];

  constructor(private jenisService:JenisService, private router:Router) {
    super(jenisService);
    this.jenisService.setData(new JenisFormData());
  }

  ngOnInit(): void {
  }

  sendCreateData(event:JenisFormData)
  {
    this.jenisService.setLoading(true);
    this.jenisService.post(event).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil menambahkan Jenis'
        }).then(()=>this.router.navigate(['/jenis']));
        this.jenisService.setLoading(false);
      },
      (error)=>{
        console.error('error : ', error);
        this.jenisService.setLoading(false);
      }
    )
  }

  onClosedAlert(){

  }

}

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.component';
import { JenisFormData } from '../jenis.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JenisService } from '../jenis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent extends BaseComponent implements OnInit {
  dataJenis:JenisFormData = new JenisFormData();
  errors:string[] = [];

  constructor(private activatedRoute:ActivatedRoute, private jenisService:JenisService, private router:Router) {
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

  sendCreateData(event:JenisFormData)
  {
    this.jenisService.setLoading(true);
    this.jenisService.put(event).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil edit Jenis'
        }).then(()=>this.router.navigate(['/jenis']));
        this.jenisService.setLoading(false);
      },
      (error)=>{
        console.error('error : ', error);
        this.jenisService.setLoading(false);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../../core/base/base.component';
import { PemasukanFormData } from '../pemasukan.model';
import { PemasukanService } from '../pemasukan.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent extends BaseComponent implements OnInit {
  errors:string[] = [];

  constructor(private pemasukanService:PemasukanService, private activatedRoute:ActivatedRoute, private router:Router) {
    super(pemasukanService);
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.loadData(id);
  }

  loadData(id: number) {
    this.pemasukanService.getById(id).subscribe(
      (data:PemasukanFormData)=>{

        this.pemasukanService.setData(data);
      },
      (error)=>{
        this.errors = error;
      }
    );
  }

  submitData(eventPayload)
  {
    this.pemasukanService.put(eventPayload).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil mengubah data Pemasukan'
        })
        this.pemasukanService.setLoading(false);
        this.router.navigate(['/pemasukan']);
      },
      (error)=>{
        this.errors = error;
      }
    );
  }
}

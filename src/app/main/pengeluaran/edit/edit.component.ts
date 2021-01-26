import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../../core/base/base.component';
import { PengeluaranFormData } from '../pengeluaran.model';
import { PengeluaranService } from '../pengeluaran.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent extends BaseComponent implements OnInit {
  errors:string[] = [];

  constructor(private pengeluaranService:PengeluaranService, private activatedRoute:ActivatedRoute, private router:Router) {
    super(pengeluaranService);
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.loadData(id);
  }

  loadData(id: number) {
    this.pengeluaranService.getById(id).subscribe(
      (data:PengeluaranFormData)=>{

        this.pengeluaranService.setData(data);
      },
      (error)=>{
        this.errors = error;
      }
    );
  }

  submitData(eventPayload)
  {
    this.pengeluaranService.put(eventPayload).subscribe(
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil mengubah data Pemasukan'
        })
        this.pengeluaranService.setLoading(false);
        this.router.navigate(['/pengeluaran']);
      },
      (error)=>{
        this.errors = error;
      }
    );
  }
}

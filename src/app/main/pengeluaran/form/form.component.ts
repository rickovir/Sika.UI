import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PengeluaranFormData } from '../pengeluaran.model';
import { PengeluaranService } from '../pengeluaran.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { JenisService } from '../../jenis/jenis.service';
import { IPagedQuery, ISimpleMasterData, IPagedResult } from '../../../config/models/master.model';
import { JenisPageQuery } from '../../jenis/jenis.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() formType:string;
  formData:PengeluaranFormData = new PengeluaranFormData();
  @Output() onFormSubmited = new EventEmitter<PengeluaranFormData>();
  
  imgUpload: any = null;

  imgPreview: any = null;
  imgErrors: string[] = [];
  progress: number = 0;
  isUploadProgress: boolean = false;

  jenisSugestions:ISimpleMasterData[];
  jenisTotalRecord:number = 0;

  initialDate:Date;

  selectedJenis:ISimpleMasterData;

  constructor(private pengeluaranService:PengeluaranService, private jenisService:JenisService) {
    this.pengeluaranService.dataState$.subscribe(
      (data:any)=>{
        if(data)
        {
          this.formData = data;
          this.initialDate = this.formData.tanggal.length ? new Date(this.formData.tanggal) : new Date();

          if(this.formType == 'view' || this.formType == 'edit')
          {
            this.imgPreview = this.formData?.imageUrl ? `${environment.apiUrl}/other/pengeluaranImg/${this.formData?.imageUrl}`:null;
            this.selectedJenis = {ID:this.formData.jenisID, nama:this.formData.jenisNama}
          }
        }
      }
    )
  }

  ngOnInit(): void {
    let jenisQuery:JenisPageQuery = {
      ...new JenisPageQuery(),
      ...{tipe:'O'}
    };
    this.getJenis(jenisQuery);

  }

  uploadImage():Promise<any>
  {
    return new Promise(
      (resolve, reject)=>{
        if(!this.imgUpload && this.formType =='edit')
        {
          resolve(this.formData.imageUrl);
          return;
        }

        this.pengeluaranService.postImage(this.imgUpload).toPromise().then(
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.progress = Math.round(event.loaded / event.total * 100);
                break;
              case HttpEventType.Response:
                resolve(event.body.filename);
    
                setTimeout(() => {
                  this.progress = 0;
                  this.isUploadProgress = false;
                }, 1500);
            }
          },
          error => {
            this.pengeluaranService.setLoading(false);
            reject(error);
          });
      }
    )
  }
  
  submitForm()
  {
    this.pengeluaranService.setLoading(true);
    
    this.uploadImage().then(
      (data:string)=>{
        this.formData.imageUrl = data;
        this.onFormSubmited.emit(this.formData);
      },
      (error)=>{
        if(error)
        {
          console.log(error);
        }
      }
    );

  }

  onSearchJenis(event:IPagedQuery)
  {
    let jenisQuery:JenisPageQuery = {
      ...new JenisPageQuery(),
      ...event,
      ...{tipe:'O'}
    };
    this.getJenis(jenisQuery);
    
  }

  getJenis(jenisQuery)
  {
    this.jenisService.getListWithPaging(jenisQuery).subscribe(
      (data:IPagedResult)=>{
        this.jenisSugestions = data.data;
        this.jenisTotalRecord = data.totalRecords;
      },
      (error) =>{
        console.log('get jenis error : ', error);
      }
    )
  }

  onSelectJenis(event:ISimpleMasterData){
    this.formData.jenisID = event.ID;
  }

  onChangeFile(event) {
    if (event.target.files[0]) {
      var photo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgPreview = reader.result;
      reader.readAsDataURL(photo);

      this.imgUpload = photo;
    }
  }

  onDateChange(event:Date)
  {
    event.setHours(0,0,0,0);

    this.formData.tanggal = event.toJSON();
  }

  onClosedAlertImgErrors()
  {
    this.imgErrors = [];
  }
}

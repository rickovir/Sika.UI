import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PemasukanFormData } from '../pemasukan.model';
import { PemasukanService } from '../pemasukan.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { JenisService } from '../../jenis/jenis.service';
import { IPagedQuery, ISimpleMasterData, IPagedResult } from '../../../config/models/master.model';
import { JenisPageQuery } from '../../jenis/jenis.model';
import { error } from 'protractor';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() formType:string;
  formData:PemasukanFormData = new PemasukanFormData();
  @Output() onFormSubmited = new EventEmitter<PemasukanFormData>();
  
  imgUpload: any = null;

  imgPreview: any = null;
  imgErrors: string[] = [];
  progress: number = 0;
  isUploadProgress: boolean = false;

  jenisSugestions:ISimpleMasterData[];
  jenisTotalRecord:number = 0;

  constructor(private pemasukanService:PemasukanService, private jenisService:JenisService) {
    this.pemasukanService.dataState$.subscribe(
      (data:any)=>{
        if(data)
        {
          this.formData = data;

          if(this.formType == 'view' || this.formType == 'edit')
          {
            this.imgPreview = this.formData?.imageUrl ? `${environment.apiUrl}/other/pemasukanImg/${this.formData?.imageUrl}`:null;
          }
        }
      }
    )
  }

  ngOnInit(): void {
    let jenisQuery:JenisPageQuery = {
      ...new JenisPageQuery(),
      ...{tipe:'I'}
    };
    this.getJenis(jenisQuery);

  }
  
  submitForm()
  {
    this.pemasukanService.setLoading(true);
    this.pemasukanService.postImage(this.imgUpload).toPromise().then(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.formData.imageUrl = event.body.filename;
            console.log(event.body)

            this.onFormSubmited.emit(this.formData);

            setTimeout(() => {
              this.progress = 0;
              this.isUploadProgress = false;
            }, 1500);

        }
      },
      error => {
        this.pemasukanService.setLoading(false);
        if (error.status === 400) {
          console.log(error);
        }
      });

  }

  onSearchJenis(event:IPagedQuery)
  {
    let jenisQuery:JenisPageQuery = {
      ...new JenisPageQuery(),
      ...event,
      ...{tipe:'I'}
    };
    this.getJenis(jenisQuery);
    
  }

  getJenis(jenisQuery)
  {
    this.jenisService.getListWithPaging(jenisQuery).subscribe(
      (data:IPagedResult)=>{
        this.jenisSugestions = data.data;
        this.jenisTotalRecord = data.totalRecords;
      }
    )
  }

  onSelectJenis(event:ISimpleMasterData){
    this.formData.jenisID = event.ID;
    console.log(event)
  }

  onChangeFile(event) {
    if (event.target.files[0]) {
      var photo = event.target.files[0];
      const reader = new FileReader();
      // const photoUpload = new File(photo,photo.name);
      // console.log(photoUpload)
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PemasukanFormData } from '../pemasukan.model';
import { PemasukanService } from '../pemasukan.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { JenisService } from '../../jenis/jenis.service';
import { IPagedQuery, ISimpleMasterData, IPagedResult } from '../../../config/models/master.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {
  @Input() formType:string;
  @Input() formData:PemasukanFormData;
  @Output() onFormSubmited = new EventEmitter<PemasukanFormData>();
  
  imgUpload: any = null;

  imgPreview: any = null;
  imgErrors: string[] = [];
  progress: number = 0;
  isUploadProgress: boolean = false;

  jenisSugestions:ISimpleMasterData[];

  constructor(private pemasukanService:PemasukanService, private jenisService:JenisService) { }

  ngOnInit(): void {
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

  onSearchJenis(event)
  {
    let jenisQuery:IPagedQuery = {
      page:1,
      itemsPerPage:10,
      search:event.query
    };
    this.jenisService.getListWithPaging(jenisQuery).subscribe(
      (data:IPagedResult)=>{
        this.jenisSugestions = data.data;
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
      // const photoUpload = new File(photo,photo.name);
      // console.log(photoUpload)
      reader.onload = e => this.imgPreview = reader.result;
      reader.readAsDataURL(photo);

      this.imgUpload = photo;
    }
  }

  onDateChange(event:Date)
  {
    this.formData.tanggal = `${event.getFullYear()}/${event.getMonth() +1}/${event.getDate()}`;
  }

  onClosedAlertImgErrors()
  {
    this.imgErrors = [];
  }
}

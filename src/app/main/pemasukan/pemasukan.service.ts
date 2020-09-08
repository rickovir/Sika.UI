import { Injectable } from '@angular/core';
import { BaseAppService } from '../../core/request/base.app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PemasukanService extends BaseAppService {
  serviceUri:string;

  constructor(protected httpService:HttpClient) {
    super(httpService);
    this.serviceUri = `${environment.apiUrl}/pemasukan`;
  }

  postImage(data) {
    let formData = new FormData();
    formData.append("image", data);

    return this.httpService.post(`${this.serviceUri}/Upload`, formData, { headers: this.getMultiPartAuthHttpRequestHeader(),reportProgress:true,observe:'events' });
  }
}

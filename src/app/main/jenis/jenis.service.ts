import { Injectable } from '@angular/core';
import { BaseAppService } from '../../core/request/base.app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JenisFormData } from './jenis.model';

@Injectable()
export class JenisService extends BaseAppService {
  serviceUri:string;

  constructor(protected httpService:HttpClient) {
    super(httpService);
    this.serviceUri = `${environment.apiUrl}/jenis`;
  }
}

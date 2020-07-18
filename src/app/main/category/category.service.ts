import { Injectable } from '@angular/core';
import { BaseAppService } from '../../core/request/base.app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService extends BaseAppService {
  serviceUri:string;

  constructor(protected http:HttpClient) {
    super(http);
    this.serviceUri = `${environment.apiUrl}/category`;
  }
}

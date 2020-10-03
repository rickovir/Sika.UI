import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseAppService } from '../../core/request/base.app.service';

@Injectable()
export class CashFlowService extends BaseAppService {
  serviceUri:string;

  constructor(protected httpService:HttpClient) {
    super(httpService);
    this.serviceUri = `${environment.apiUrl}/transaksi`;
  }
}

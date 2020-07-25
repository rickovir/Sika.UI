import { Injectable } from '@angular/core';
import { BaseAppService } from '../../core/request/base.app.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PengeluaranService extends BaseAppService {

  constructor(protected http:HttpClient) {
    super(http)
  }
}

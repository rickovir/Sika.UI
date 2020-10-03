import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashFlowRoutingModule } from './cash-flow-routing.module';
import { CashFlowComponent } from './cash-flow.component';
import { CashFlowService } from './cash-flow.service';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [CashFlowComponent],
  imports: [
    CommonModule,
    CashFlowRoutingModule,
    ShareModule
  ],
  providers:[
    CashFlowService
  ]
})
export class CashFlowModule { }

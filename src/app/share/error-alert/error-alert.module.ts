import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ErrorAlertComponent } from './error-alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
    imports: [
        CommonModule,
        AlertModule.forRoot()
     ],
    declarations: [
        ErrorAlertComponent
    ],
    exports: [
        ErrorAlertComponent
    ]
})
export class ErrorAlertModule { }
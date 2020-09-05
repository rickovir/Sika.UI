import { Input, Component, Output } from '@angular/core';

@Component({
    selector:'error-alert',
    template:`
    <div class="row">
        <div class="col mt-3" *ngIf="errors?.length != 0">
            <alert type="danger" dismissible="true" (onClosed)="onClosedAlert()">
            <div *ngFor="let error of errors">
                <b>Attention!</b> {{error}}
            </div>
            </alert>
        </div>
    </div>
    `
})
export class ErrorAlertComponent{
    @Input() errors:string[] = [];

    onClosedAlert()
    {
        this.errors = [];
    }
}
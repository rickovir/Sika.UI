import { Input, Component } from '@angular/core';

@Component({
    selector:'app-loader',
    template:`
    <div class="backdrop" *ngIf="show">
        <div class="spinner">
            <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        </div>
    </div>
    `,
    styleUrls:['./loader.component.scss']
})
export class LoaderComponent{
    @Input() show:boolean;
    @Input() currentState:string;
}
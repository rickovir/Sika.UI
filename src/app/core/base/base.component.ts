import { OnInit, OnDestroy, Inject } from '@angular/core';
import { IAppService } from '../../config/models/master.model';

export abstract class BaseComponent implements OnInit, OnDestroy{
    loading:boolean;
    state:string;

    constructor(@Inject('IAppService') private service:IAppService)
    {
        this.service.loading$.subscribe(data=>this.loading = data);

        this.service.currentState$.subscribe(data=>this.state = data);
    }

    ngOnInit()
    {

    }

    ngOnDestroy(){
        this.service.setState('');
        this.service.setLoading(false);
    }
}
import { BaseHttpService } from './base.http.service';
import { IAppService } from '../../config/models/master.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class BaseAppService extends BaseHttpService implements IAppService{
    protected stateSubject:BehaviorSubject<string>;
    currentState$:Observable<string>;

    protected loadingSubject:BehaviorSubject<boolean>;
    loading$:Observable<boolean>;

    protected dataSubject:BehaviorSubject<Object>;
    dataState$:Observable<Object>;

    constructor(private _httpClient:HttpClient)
    {
        super(_httpClient);

        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading$ = this.loadingSubject.asObservable();

        this.stateSubject = new BehaviorSubject<string>('');
        this.currentState$ = this.stateSubject.asObservable();

        this.dataSubject = new BehaviorSubject<Object>(null);
        this.dataState$ = this.dataSubject.asObservable();
    }

    setLoading(loading:boolean)
    {
        this.loadingSubject.next(loading);
    }

    setState(state:string)
    {
        this.stateSubject.next(state);
    }

    setData(data:Object)
    {
        this.dataSubject.next(data);
    }
}
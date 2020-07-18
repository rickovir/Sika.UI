import { Observable } from 'rxjs';

export interface IAppService{
    currentState$:Observable<string>;
    loading$:Observable<boolean>;

    setState(state:string):void;
    setLoading(loading$:boolean):void;
}
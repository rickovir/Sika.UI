import { Observable } from 'rxjs';

export interface IAppService{
    currentState$:Observable<string>;
    loading$:Observable<boolean>;

    setState(state:string):void;
    setLoading(loading$:boolean):void;
}

export interface ISimpleMasterData {
    ID: number;
    nama: string;
}
  

export interface IOption {
    name: string;
    value: any;
}

export class OptionValue {
    id: number;
    name: string;
    value: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.value = false;
    }
}

export interface IPagedResult {
    currentPage: number;
    totalRecords: number;
    data: any[];
    resultPerPage: number;
}

export interface IPagedQuery {
    page: number;
    itemsPerPage: number;
    search: string;
}

export interface ISortable {
    field: string;
    order: number;
}
  
  
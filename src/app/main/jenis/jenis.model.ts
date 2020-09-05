import { ISimpleMasterData, IPagedQuery, ISortable } from '../../config/models/master.model';

export class Jenis{
    ID:number;
    nama:string;
    tipe:string;

    constructor()
    {
        this.ID = 0;
        this.nama = "";
        this.tipe = "";
    }
}


export class JenisPageQuery implements IPagedQuery, ISortable{
    page:number;
    itemsPerPage:number;
    search:string;
    field:string;
    order:number;

    constructor()
    {
        this.page = 1;
        this.itemsPerPage = 10;
        this.search="";
        this.field = "";
        this.order= 1;
    }
}

export class JenisFormData{
    id:number;
    nama:string;
    tipe:string;
    constructor(){
        this.id = 0;
        this.nama = "";
        this.tipe = "";
    }
}
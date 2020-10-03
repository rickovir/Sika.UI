import { IPagedQuery, ISortable } from '../../config/models/master.model';

export class CashFlow{
    tanggal:string;
    nomorKas:string;
    judulKas:string;
    debit:string;
    kredit:string;
    arusKas:string;

    constructor(){
        this.tanggal = "";
        this.nomorKas = "";
        this.judulKas = "";
        this.debit = "";
        this.kredit = "";
        this.arusKas = "";
    }
}

export class CashFlowPageQuery implements IPagedQuery{
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
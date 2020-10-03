import { IPagedQuery, ISortable } from '../../config/models/master.model';

export class Pemasukan{
    ID:number;
    transaksiID:number;
    nomorKas: string;
    tanggal: string;
    judul: string;
    imageUrl: string;
    keterangan: string;
    namaPenanggungJawab: string;
    jumlah: number;
    jenisID: number;
    jenisNama: string;

    constructor()
    {
        this.ID = 0;
        this.transaksiID = 0;
        this.nomorKas = "";
        this.tanggal = "";
        this.judul = "";
        this.imageUrl = "";
        this.keterangan = "";
        this.namaPenanggungJawab = "";
        this.jumlah = 0;
        this.jenisID = 0;
        this.jenisNama = "";
    }
}

export class PemasukanPageQuery implements IPagedQuery, ISortable{
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

export class PemasukanFormData extends Pemasukan{
    constructor(){
        super();
    }
}
import { IPagedQuery, ISortable } from '../../config/models/master.model';

export class Pengeluaran{
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
    }
}

export class PengeluaranPageQuery implements IPagedQuery, ISortable{
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
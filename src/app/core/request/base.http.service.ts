import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagedQuery } from '../../config/models/master.model';

@Injectable({
    providedIn:'root'
})
export abstract class BaseHttpService{
    public serviceUri:string;

    constructor(protected http:HttpClient){}

    getDefaultAuthHttpRequestHeader():HttpHeaders
    {
        return new HttpHeaders({
            'accept' : '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        })
    }

    getAll():Observable<Object>{
      return this.http.get(`${this.serviceUri}`,  { headers: this.getDefaultAuthHttpRequestHeader() });
    }

    getListWithPaging(query:IPagedQuery):Observable<Object>{
      let url = `${this.serviceUri}?`;

      for (const element in query) {
        if (query[element] && query[element].toString() !== '') {
          url = `${url}${element}=${query[element]}&`;
        }
      }
  
      url = url.substring(0, url.length - 1);

      return this.http.get(url,  { headers: this.getDefaultAuthHttpRequestHeader() });
    }

    getById(id: number): Observable<Object> {
      return this.http.get(`${this.serviceUri}/${id}`, { headers: this.getDefaultAuthHttpRequestHeader() });
    }

    post(data: any): Observable<Object> {
      return this.http.post(`${this.serviceUri}`, JSON.stringify(data), { headers: this.getDefaultAuthHttpRequestHeader() });
    }
  
    put(data: any): Observable<Object> {
      const id = data?.id ? data?.id : data?.ID;
      return this.http.put(`${this.serviceUri}/${id}`, JSON.stringify(data), { headers: this.getDefaultAuthHttpRequestHeader() });
    }
  
    delete(id): Observable<Object> {
      return this.http.delete(`${this.serviceUri}/${id}`, { headers: this.getDefaultAuthHttpRequestHeader() });
    }
}
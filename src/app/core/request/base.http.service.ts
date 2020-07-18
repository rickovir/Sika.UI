import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
    }

    getAll():Observable<Object>{
      return this.http.get(`${this.serviceUri}`,  { headers: this.getDefaultAuthHttpRequestHeader() });
    }

    getById(id: number): Observable<Object> {
      return this.http.get(`${this.serviceUri}/${id}`, { headers: this.getDefaultAuthHttpRequestHeader() });
    }

    post(data: any): Observable<Object> {
      return this.http.post(`${this.serviceUri}`, JSON.stringify(data), { headers: this.getDefaultAuthHttpRequestHeader() });
    }
  
    put(data: any): Observable<Object> {
      return this.http.put(`${this.serviceUri}/${data.id}`, JSON.stringify(data), { headers: this.getDefaultAuthHttpRequestHeader() });
    }
  
    delete(id): Observable<Object> {
      return this.http.delete(`${this.serviceUri}/${id}`, { headers: this.getDefaultAuthHttpRequestHeader() });
    }
}
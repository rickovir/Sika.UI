import { Injectable } from '@angular/core';
import { IPagedQuery } from '../../config/models/master.model';

@Injectable()
export class PageQueryHistoryService {
    path:string;
    listPageQuery:any;
    isPageQueryLoaded:boolean = false;

    constructor(){}

    // set path data
    setPathData(currentPath:string, query:any)
    {
      this.path = currentPath;
      this.listPageQuery = query;
  
      let queryStr:string = JSON.stringify(query);
      localStorage.setItem('path-history', currentPath);
      localStorage.setItem('query-history', queryStr);
    }
  
    // loading page query data from localstorage
    loadPathData()
    {
      this.path = <string>localStorage.getItem('path-history');
      let queryStr = localStorage.getItem('query-history');
      this.listPageQuery = JSON.parse(queryStr);
    }
  
    setCurrentState(url:string, query:any, callback:(dataQuery:any)=>void)
    {
      this.loadPathData();
      //check path
      let currentPath:string = url.split('/')[1];
      if(this.path != currentPath)
      {
        this.setPathData(currentPath,query);
      }
      else
      {
        callback(this.listPageQuery);
      }
  
    }
    
    // recording pagequery changes
    recordChanges(query:any, callback:(dataQuery:any)=>void)
    {
      if(!this.isPageQueryLoaded)
      {
        this.isPageQueryLoaded = true;
  
        this.setPathData(this.path, query);
        
        // send callback current pagequery
        callback(this.listPageQuery);
      }
      else
      {
        this.setPathData(this.path, query);
      }
    }
  
    reset()
    {
      this.isPageQueryLoaded = false;
    }
}
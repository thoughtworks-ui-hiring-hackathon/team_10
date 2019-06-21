import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiKey = environment.api_key;
  apiParams:HttpParams;
  constructor(private http: HttpClient) { 
  }

  getDetails(url,params){
    // this.apiParams.set('api_key',this.apiKey);
    // if (params){
    //   for (let param in params){
    //     this.apiParams.set('api_key',params[param]);
    //   }
    // }
    this.apiParams = {'api_key':this.apiKey,...params};
    // console.log('url',url);
    // console.log('params',this.apiParams);
    return this.http.get(url,{"params":this.apiParams});
  }
}

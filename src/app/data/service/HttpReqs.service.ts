import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpReqsService {

  public api =  "https://recruiting-api.newshore.es/api/";

  constructor(private http: HttpClient) { }

  public get(url: string) {
    return this.http.get<any>(this.api + url);
  }

  public post(url: string, DATA: any) {
    return this.http.post(this.api + url, DATA);
  }

  public delete(url: string) {
    return this.http.delete(this.api + url);
  }

  public put(url: string, DATA: any) {
    return this.http.put(this.api + url, DATA);
  }

}

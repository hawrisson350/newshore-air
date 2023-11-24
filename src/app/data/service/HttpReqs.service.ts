import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpReqsService {

  public api = "https://recruiting-api.newshore.es/api/";
  public currency = "http://data.fixer.io/api/latest?access_key=bce66745f0069156d1dd0c6843ca6049&format=1";

  constructor(private http: HttpClient) { }

  public get(url: string) {
    return this.http.get<any>(this.api + url);
  }

  public convertCurrency() {
    return this.http.get<any>(this.currency);
  }

}

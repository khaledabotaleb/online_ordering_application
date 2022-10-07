import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  post(URL: string, OBJ: any): Observable<any> {
    return this.httpClient.post(`${environment.apiEndPoint}${URL}`, OBJ);
  }

  get(URL: string): Observable<any> {
    return this.httpClient.get(`${environment.apiEndPoint}${URL}`);
  }

  patch(URL: string, OBJ: any): Observable<any> {
    return this.httpClient.patch(`${environment.apiEndPoint}${URL}`, OBJ);
  }

  delete(URL: string, ID: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiEndPoint}${URL}${ID}/`);
  }
}

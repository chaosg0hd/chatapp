import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 ConnStatus: any[] = [];

  //SERVICES FOR DATA  

  baseURL = "http://localhost:3000";

  //checkConn() {
  //  return this.http.get(`${this.baseURL}/api/check`);
  //}

  //sendApiRequest(method: any, data: any) {
  //  return <any>(
  //    this.http.post(this.apiURL + method, btoa(JSON.stringify(data))
  //    )
  //  );
  //}

  //General Methods

  get(uri: string) {
    return this.http.get(`${this.baseURL}/api/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(`${this.baseURL}/api/${uri}`, payload);
  }

  put(uri: string, payload: object) {
    return this.http.put(`${this.baseURL}/api/${uri}`, payload);
  }

  patch(uri: string, payload: object) {
    return this.http.patch(`${this.baseURL}/api/${uri}`, payload);
  }

  //Data Methods

  getAllItem(uri: any) {
    return this.get(uri);
  }

  getChat(uri: any, user: any) {
    return this.get(`${uri}/${user}`);
  }

  //Name is Temporary

  createItem(uri: any, data: any) {
    return this.post(uri, { data });
  }

  //updateChat(uri: any, _id: any) {
  //  return this.get(`${uri}/${_id}`);
  //}

  //createItemss = async (uri: any, data: any) => {
  //  const response: any = await this.post(uri, { data }).toPromise();
  //  return response;
  //}

  //createItemInv(uri: any, data: any, file: any) {
  //  return this.post(uri, { data, file });
  //}

  //getItem(uri: any, id: any) {
  //  return this.get(`${uri}/${id}`);
  //}

  updateItem(uri: any, id: any, data: any) {
    return this.put(`${uri}/${id}`, { data })
  }

  //archiveItem(uri: any, id: any, data: any) {
  //  return this.patch(`${uri}/${id}`, { data });
  //}

}

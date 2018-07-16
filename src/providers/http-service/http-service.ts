import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpServiceProvider {
  // Service connected with the custom API
  private url: string = 'http://localhost:5000';
  // Service connected with the moodle API
  private moodleUrl: string = 'http://localhost/moodle';

  constructor(public http: HttpClient) {

  }

  // common services
  getAll(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`);
  }

  get(endpoint, id) {
    return this.http.get(`${this.url}/${endpoint}/${id}`);
  }

  post(endpoint, resource) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.url}/${endpoint}`, resource, {headers: headers});
  }

  // moodle services
  getMoodle(endpoint) {
    return this.http.get(`${this.moodleUrl}/${endpoint}`);
  }

}

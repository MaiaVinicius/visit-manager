import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestapiService {
  apiUrl = 'http://38.131.4.215/components/admin/painel';
  data;

  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }

  getVisits() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getVisits')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  saveContact(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/saveContact', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

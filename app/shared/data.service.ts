import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService {
    constructor (private _http: Http) {}

    getAllData(): Observable<any> {
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
        return this._http.get('thevariations.firebaseio.com/users/data.json' + token)
            .map(response => response.json());
    }

    addData(data: any): Observable<any> {
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://thevariations.firebaseio.com/users/data.json' + token, body, {headers: headers})
            .map(response => response.json());
    }

    deleteAllData(): Observable<any> {
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
        return this._http.delete('https://thevarations.firebaseio.com/users/data.json' + token)
            .map(response => response.json());
    }
}
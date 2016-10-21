/**
 * Created by aravind on 9/9/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    private authenticationBaseURL = 'http://localhost:3002/user/';

    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });

    constructor(private http:Http) {}

    addUserData(userData): Observable<User> {
        return this.http.post(this.authenticationBaseURL + 'userSignUp', userData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    checkUserLogin(userData): Observable<Object> {
      return this.http.post(this.authenticationBaseURL + 'userLogin', userData, this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}
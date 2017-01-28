/**
 * Created by aravind on 9/9/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {StorageService} from "./storage.service";

@Injectable()
export class AuthenticationService{
    constructor(private http:Http,
                private storageService:StorageService) {}
    private authenticationBaseURL = 'http://localhost:3002/user/';

    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });

    private authToken = this.storageService.getData('authToken');
    public headersGet = new Headers(
        {
            'Authorization': this.authToken
        });
    public optionsGet = new RequestOptions({ headers: this.headersGet });


    addUserData(userData): Observable<User> {
        console.log('user data in registration----', userData);
        return this.http.post(this.authenticationBaseURL + 'userSignUp', userData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    checkUserLogin(userData): Observable<Object> {
      return this.http.post(this.authenticationBaseURL + 'userLogin', userData, this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    fetchUserDataById(user_id) {
        return this.http.get(this.authenticationBaseURL + 'userInfo?user_id='+ user_id, this.optionsGet)
        .map(this.extractData)
        .catch(this.handleError);
    }

    updateUserData(userData) {
      return this.http.post(this.authenticationBaseURL + 'updateUserInfo', userData, this.options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    sendForgotLink(data) {
        return this.http.get(this.authenticationBaseURL + 'sendForgotLink?email=' + data, this.optionsGet)
        .map(this.extractData)
        .catch(this.handleError);
    }

    updatePassword(data) {
        return this.http.post(this.authenticationBaseURL + 'updatePassword', data, this.options)
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
/**
 * Created by aravind on 21/9/16.
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {StorageService} from "./storage.service";
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectMemberService {
    private projectMemberBaseURL ="http://localhost:3002/projectMember/";
    private authToken = this.storageService.getData('authToken');
    public headers = new Headers(
        { 'Content-Type': 'application/json',
          'Authorization': this.authToken
        });
    public options = new RequestOptions({ headers: this.headers });

    public headersGet = new Headers(
        {
            'Authorization': this.authToken
        });
    public optionsGet = new RequestOptions({ headers: this.headersGet });

    constructor(private http:Http,
                private storageService: StorageService) {}

    addMember(memberData):Observable <User> {
      return this.http.post(this.projectMemberBaseURL + 'addMember', memberData, this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }
    getAllMember(project_id) {
      return this.http.get(this.projectMemberBaseURL + 'getMemberDetails?project_id=' + project_id, this.optionsGet)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log('body data--<<>>', body);
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
/**
 * Created by aravind on 18/9/16.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { ProjectDetails } from '../models/ProjectDetails';
import {StorageService} from "./storage.service";
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

    constructor(private storageService:StorageService,
                private http:Http) {}

    private projectHttpURL ='http://localhost:3002/project/';

    /**
     * Authentication token
     * **/
    private authToken = this.storageService.getData('authToken');
    private userId = this.storageService.getData('userId');

    /**
     * Headers for POST and GET calls
     * **/
    public headers = new Headers(
        {
            'Content-Type': 'application/json',
            'Authorization': this.authToken
        });
    public options = new RequestOptions({ headers: this.headers });
    public headersGet = new Headers(
        {
            'Authorization': this.authToken
        });
    public optionsGet = new RequestOptions({ headers: this.headersGet });

    createProject(projectObj): Observable <User> {

        return this.http.post(this.projectHttpURL + 'createProject', projectObj, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTopProjects(): Observable <ProjectDetails> {
        return this.http.get(this.projectHttpURL + 'fetchTopProjects?user_id='+ this.userId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProjectDataById(projectId) {
        return this.http.get(this.projectHttpURL+ 'fetchProjectDetailsById?project_id='+ projectId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateProjectDetails(projectData) {
        return this.http.post(this.projectHttpURL + 'updateProjectDetails', projectData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveProjectSettings(projectSettings){
        return this.http.post(this.projectHttpURL + 'saveProjectSettings', projectSettings, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    fetchProjectSettings(projectId) {
        return this.http.get(this.projectHttpURL + 'fetchProjectSettings?project_id=' + projectId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteProject(project_id) {
        return this.http.delete(this.projectHttpURL + 'deleteProjectById?project_id=' + project_id, this.options)
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
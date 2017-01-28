/**
 * Created by aravind on 6/10/16.
 */

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import 'rxjs/add/operator/map';
import {StorageService} from "./storage.service";
import { Story } from  '../models/Story';

@Injectable()
export class StoryService {
    constructor(private storageService:StorageService,
                private http:Http) {}

    private projectHttpURL ='http://localhost:3002/story/';

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

    /**
     * Method for adding story
     * @storyInfo - object containing story details
     * **/
    addStoryDetails(storyData, projectId): Observable <User> {
      return this.http.post(this.projectHttpURL + 'addStory', storyData, this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    /**
     * Method for fetching all available stories
     * **/
    getAllStoryDetails(project_id): Observable <Story> {
        return this.http.get(this.projectHttpURL + 'fetchStoryByUser?project_id=' + project_id + '&user_id='+ this.userId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update story status
     * **/
    updateStoryStatus(data) {
      return this.http.post(this.projectHttpURL + 'updateStoryStatus', data, this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    /**
     * Get story based on the selected category
     * @status = story status (In progress, done, completed, delivered)
     * **/
    getStoryByStatus(project_id, status) {
      return this.http.get(this.projectHttpURL + 'fetchStoryByCategory?project_id=' + project_id +
          '&status=' + status, this.optionsGet)
          .map(this.extractData)
          .catch(this.handleError);
    }

    /**
     * Add story comment
     * **/

    addStoryComment(comment) {
        return this.http.post(this.projectHttpURL + 'addComment', comment, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**
     * Fetch comments by story id
     * **/
    fetchStoryCommentsById(storyId) {
        return this.http.get(this.projectHttpURL + 'fetchCommentByStory?story_id=' +storyId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Add label
     * **/
    addStoryLabel(storyLabelData) {
        return this.http.post(this.projectHttpURL + 'addStoryLabel', storyLabelData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Fetch label by story
     * **/
    fetchStoryByLabel(story_id){
        return this.http.get(this.projectHttpURL + 'fetchLabelByStory?story_id=' + story_id, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Fetch story by user id for showing in home page
     * **/
    fetchStoryListByUser() {
        return this.http.get(this.projectHttpURL + 'fetchTopStories?userId=' + this.userId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Add Story types (Bug, Feature, Chore..etc)
     * **/

    addStoryType(type) {
        return this.http.post(this.projectHttpURL + 'saveStoryType', type, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**
     * Add story status ( Unstarted, inprogress etc )
     * **/
    addStoryStatus(status) {
        return this.http.post(this.projectHttpURL + 'saveStoryStatus', status, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Export story details
     * **/
    exportStoryDetails(storyData) {
        return this.http.post(this.projectHttpURL + 'exportStoryInfo', storyData, this.options)
        .map(this.extractCSV)
        .catch(this.handleError);
    }

    extractCSV(res: Response) {
     return res;
    }

    deleteStoryById(story_id) {
        return this.http.delete(this.projectHttpURL + 'deleteStoryById?story_id='+ story_id, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    deleteCommentById(comment_id) {
        return this.http.delete(this.projectHttpURL + 'deleteCommentById?comment_id='+ comment_id, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    deleteLabelById(label_id) {
        return this.http.delete(this.projectHttpURL + 'deleteLabelById?label_id='+ label_id, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    updateStoryDescription(storyData) {
       return this.http.post(this.projectHttpURL + 'updateStoryDescription', storyData, this.options)
       .map(this.extractData)
       .catch(this.handleError);
    }

    getStoryCount() {
      return this.http.get(this.projectHttpURL + 'getTaskCount?user_id=' + this.userId, this.optionsGet)
      .map(this.extractData)
      .catch(this.handleError);
    }

    /**
     * Wrapper for processing HTTP results
     * **/
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    /**
     * Error handler function
     * **/
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}

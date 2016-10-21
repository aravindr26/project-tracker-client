/**
 * Created by aravind on 6/10/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var storage_service_1 = require("./storage.service");
var StoryService = (function () {
    function StoryService(storageService, http) {
        this.storageService = storageService;
        this.http = http;
        this.projectHttpURL = 'http://localhost:3002/story/';
        /**
         * Authentication token
         * **/
        this.authToken = this.storageService.getData('authToken');
        this.userId = this.storageService.getData('userId');
        /**
         * Headers for POST and GET calls
         * **/
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authToken
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.headersGet = new http_1.Headers({
            'Authorization': this.authToken
        });
        this.optionsGet = new http_1.RequestOptions({ headers: this.headersGet });
    }
    /**
     * Method for adding story
     * @storyInfo - object containing story details
     * **/
    StoryService.prototype.addStoryDetails = function (storyData, projectId) {
        return this.http.post(this.projectHttpURL + 'addStory', storyData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Method for fetching all available stories
     * **/
    StoryService.prototype.getAllStoryDetails = function (project_id) {
        return this.http.get(this.projectHttpURL + 'fetchStoryByUser?project_id=' + project_id + '&user_id=' + this.userId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Update story status
     * **/
    StoryService.prototype.updateStoryStatus = function (data) {
        console.log("data======", data);
        return this.http.post(this.projectHttpURL + 'updateStoryStatus', data, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Get story based on the selected category
     * @status = story status (In progress, done, completed, delivered)
     * **/
    StoryService.prototype.getStoryByStatus = function (project_id, status) {
        return this.http.get(this.projectHttpURL + 'fetchStoryByCategory?project_id=' + project_id +
            '&status=' + status, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Add story comment
     * **/
    StoryService.prototype.addStoryComment = function (comment) {
        return this.http.post(this.projectHttpURL + 'addComment', comment, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Fetch comments by story id
     * **/
    StoryService.prototype.fetchStoryCommentsById = function (storyId) {
        return this.http.get(this.projectHttpURL + 'fetchCommentByStory?story_id=' + storyId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Add label
     * **/
    StoryService.prototype.addStoryLabel = function (storyLabelData) {
        return this.http.post(this.projectHttpURL + 'addStoryLabel', storyLabelData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Fetch label by story
     * **/
    StoryService.prototype.fetchStoryByLabel = function (story_id) {
        return this.http.get(this.projectHttpURL + 'fetchLabelByStory?story_id=' + story_id, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Fetch story by user id for showing in home page
     * **/
    StoryService.prototype.fetchStoryListByUser = function () {
        return this.http.get(this.projectHttpURL + 'fetchTopStories?userId=' + this.userId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Add Story types (Bug, Feature, Chore..etc)
     * **/
    StoryService.prototype.addStoryType = function (type) {
        return this.http.post(this.projectHttpURL + 'saveStoryType', type, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Add story status ( Unstarted, inprogress etc )
     * **/
    StoryService.prototype.addStoryStatus = function (status) {
        return this.http.post(this.projectHttpURL + 'saveStoryStatus', status, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Wrapper for processing HTTP results
     * **/
    StoryService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Error handler function
     * **/
    StoryService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    StoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, http_1.Http])
    ], StoryService);
    return StoryService;
}());
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map
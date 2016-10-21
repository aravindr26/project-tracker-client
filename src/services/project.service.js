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
/**
 * Created by aravind on 18/9/16.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
var storage_service_1 = require("./storage.service");
require('rxjs/add/operator/map');
var ProjectService = (function () {
    function ProjectService(storageService, http) {
        this.storageService = storageService;
        this.http = http;
        this.projectHttpURL = 'http://localhost:3002/project/';
        /**
         * Authentication token
         * **/
        this.authToken = this.storageService.getData('authToken');
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
    ProjectService.prototype.createProject = function (projectObj) {
        return this.http.post(this.projectHttpURL + 'createProject', projectObj, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.getTopProjects = function () {
        return this.http.get(this.projectHttpURL + 'fetchTopProjects', this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.getProjectDataById = function (projectId) {
        return this.http.get(this.projectHttpURL + 'fetchProjectDetailsById?project_id=' + projectId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.updateProjectDetails = function (projectData) {
        return this.http.post(this.projectHttpURL + 'updateProjectDetails', projectData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.saveProjectSettings = function (projectSettings) {
        return this.http.post(this.projectHttpURL + 'saveProjectSettings', projectSettings, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.fetchProjectSettings = function (projectId) {
        return this.http.get(this.projectHttpURL + 'fetchProjectSettings?project_id=' + projectId, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ProjectService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, http_1.Http])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map
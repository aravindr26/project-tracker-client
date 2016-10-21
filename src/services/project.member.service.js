/**
 * Created by aravind on 21/9/16.
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
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var storage_service_1 = require("./storage.service");
require('rxjs/add/operator/map');
var ProjectMemberService = (function () {
    function ProjectMemberService(http, storageService) {
        this.http = http;
        this.storageService = storageService;
        this.projectMemberBaseURL = "http://localhost:3002/projectMember/";
        this.authToken = this.storageService.getData('authToken');
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Authorization': this.authToken
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.headersGet = new http_1.Headers({
            'Authorization': this.authToken
        });
        this.optionsGet = new http_1.RequestOptions({ headers: this.headersGet });
    }
    ProjectMemberService.prototype.addMember = function (memberData) {
        return this.http.post(this.projectMemberBaseURL + 'addMember', memberData, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectMemberService.prototype.getAllMember = function (project_id) {
        return this.http.get(this.projectMemberBaseURL + 'getMemberDetails?project_id=' + project_id, this.optionsGet)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectMemberService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('body data--<<>>', body);
        return body || {};
    };
    ProjectMemberService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    ProjectMemberService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
    ], ProjectMemberService);
    return ProjectMemberService;
}());
exports.ProjectMemberService = ProjectMemberService;
//# sourceMappingURL=project.member.service.js.map
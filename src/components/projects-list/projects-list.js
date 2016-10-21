/**
 * Created by aravind on 4/9/16.
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
var core_2 = require('@angular/core');
var project_service_1 = require('../../services/project.service');
var ProjectListComponent = (function () {
    function ProjectListComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.fetchTopProjects();
    };
    ProjectListComponent.prototype.fetchTopProjects = function () {
        var _this = this;
        this.projectService.getTopProjects()
            .subscribe(function (projectList) {
            _this.projectDetails = projectList.projects;
        }, function (error) {
            console.log(error);
        });
    };
    ProjectListComponent.prototype.addProject = function (projectObj) {
        var _this = this;
        var projectObject = JSON.stringify(projectObj);
        this.projectService.createProject(projectObject)
            .subscribe(function (projectData) {
            _this.projectStatus = projectData;
            _this.statusMessage = projectData.message;
            _this.alertMessageClass = projectData.status ? 'alert-success' : '';
            _this.fetchTopProjects();
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectListComponent = __decorate([
        core_1.Component({
            selector: 'pt-projects-list',
            template: require('./projects-list.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./projects-list.css').toString()
            ],
            providers: [project_service_1.ProjectService]
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
//# sourceMappingURL=projects-list.js.map
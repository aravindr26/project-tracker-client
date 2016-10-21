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
var router_1 = require("@angular/router");
var project_service_1 = require('../../services/project.service');
var storage_service_1 = require('../../services/storage.service');
var story_service_1 = require('../../services/story.service');
var ProjectSettings = (function () {
    function ProjectSettings(activatedRoute, router, projectService, storyService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.projectService = projectService;
        this.storyService = storyService;
    }
    ProjectSettings.prototype.ngOnInit = function () {
        this.projectName = '';
        this.projectDescription = '';
        this.startDate = '';
        this.endDate = '';
        this.projectSprintDay = '';
        this.projectSprintDuration = 0;
        this.getURLParam();
        this.getProjectDetails();
        this.getProjectSettings();
    };
    ProjectSettings.prototype.getURLParam = function () {
        var _this = this;
        this.params = this.activatedRoute.params
            .subscribe(function (params) {
            _this.project_id = parseInt(params['id'], 10);
        });
    };
    ProjectSettings.prototype.getProjectDetails = function () {
        var _this = this;
        this.projectService.getProjectDataById(this.project_id)
            .subscribe(function (projectData) {
            _this.projectData = projectData;
            if (_this.projectData.ProjectData) {
                _this.projectName = _this.projectData.ProjectData.project_name;
                _this.projectDescription = _this.projectData.ProjectData.project_description;
            }
            console.log('getting project data----', projectData);
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings.prototype.updateProjectData = function (projectData) {
        var _this = this;
        projectData['project_id'] = this.project_id;
        this.projectService.updateProjectDetails(JSON.stringify(projectData))
            .subscribe(function (projectData) {
            _this.updatedData = projectData;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings.prototype.saveProjectSettings = function (projectData) {
        var _this = this;
        projectData['project_id'] = this.project_id;
        console.log('data in settings----', projectData);
        this.projectService.saveProjectSettings(JSON.stringify(projectData))
            .subscribe(function (projectSettings) {
            _this.projectSettings = projectSettings;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings.prototype.getProjectSettings = function () {
        var _this = this;
        this.projectService.fetchProjectSettings(this.project_id)
            .subscribe(function (projectSettingsData) {
            _this.projectSettingsData = projectSettingsData;
            if (_this.projectSettingsData.ProjectData) {
                _this.startDate = (_this.projectSettingsData.ProjectData.project_start_date).split('T')[0];
                _this.endDate = (_this.projectSettingsData.ProjectData.project_end_date).split('T')[0];
                _this.projectSprintDay = _this.projectSettingsData.ProjectData.project_sprint_starts_on;
                _this.projectSprintDuration = _this.projectSettingsData.ProjectData.project_sprint_duration;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings.prototype.saveStoryType = function (type) {
        var _this = this;
        this.storyService.addStoryType(JSON.stringify(type))
            .subscribe(function (storyType) {
            _this.storyType = storyType;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings.prototype.saveStoryStatus = function (status) {
        var _this = this;
        this.storyService.addStoryStatus(JSON.stringify(status))
            .subscribe(function (storyStatus) {
            _this.storyStatus = storyStatus;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectSettings = __decorate([
        core_1.Component({
            selector: 'pt-project-settings',
            template: require('./project-settings.html'),
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                require('./project-settings.css').toString()
            ],
            providers: [project_service_1.ProjectService, storage_service_1.StorageService, story_service_1.StoryService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, project_service_1.ProjectService, story_service_1.StoryService])
    ], ProjectSettings);
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;
//# sourceMappingURL=project-settings.js.map
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
 * Created by aravind on 3/9/16.
 */
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var story_service_1 = require('../../services/story.service');
var storage_service_1 = require('../../services/storage.service');
var router_2 = require("@angular/router");
var project_member_service_1 = require("../../services/project.member.service");
var TasksHomeComponent = (function () {
    function TasksHomeComponent(storyService, activatedRoute, memberService, router) {
        this.storyService = storyService;
        this.activatedRoute = activatedRoute;
        this.memberService = memberService;
        this.router = router;
    }
    TasksHomeComponent.prototype.ngOnInit = function () {
        this.storyDetails = {
            storySummery: '',
            storyType: '',
            storyPriority: 0,
            storyPoint: 0,
            storyAssignee: '',
            storyDescription: ''
        };
        this.data = {
            story_id: 0,
            story_summery: '',
            story_type: '',
            story_priority: 0,
            story_point: 0,
            createdAt: '',
            story_assignee: '',
            story_description: '',
            story_status: '0',
            user_detail: {},
            StoryList: {},
            storyStatus: 0
        };
        this.selectedStory = false;
        this.selectedNav = 'myTask';
        this.clearLabelText = '';
        this.storyComment = '';
        this.getURLParam();
        this.getMemberList();
        this.getAllStories();
    };
    TasksHomeComponent.prototype.getURLParam = function () {
        var _this = this;
        this.params = this.activatedRoute.params
            .subscribe(function (params) {
            _this.project_id = parseInt(params['id'], 10);
        });
    };
    TasksHomeComponent.prototype.getMemberList = function () {
        var _this = this;
        this.memberService.getAllMember(this.project_id)
            .subscribe(function (memberDetails) {
            _this.memberList = memberDetails.member_list;
            console.log(_this.memberList);
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getAllStories = function () {
        var _this = this;
        this.storyService.getAllStoryDetails(this.project_id)
            .subscribe(function (storyInfo) {
            _this.storyData = storyInfo.StoryList;
            if (_this.storyData && _this.storyData.length) {
                console.log('this.storyData----', _this.storyData);
                _this.buildStoryDetailsView(_this.storyData[0], 0);
            }
            else {
                _this.noStoryString = "No stories are available";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.addStoryData = function (storyInfo) {
        var _this = this;
        storyInfo.projectId = this.project_id;
        var StoryData = JSON.stringify(storyInfo);
        this.storyService.addStoryDetails(StoryData, this.project_id)
            .subscribe(function (addStoryRes) {
            _this.storyRes = addStoryRes;
            _this.getAllStories();
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.buildStoryDetailsView = function (data, selectedIndex) {
        console.log('story data---', data);
        this.selectedStory = selectedIndex;
        this.data = {
            story_id: data.story_id,
            story_summery: data.story_summery,
            story_type: data.story_type,
            story_priority: data.story_priority,
            story_status: data.story_status,
            story_point: data.story_point,
            createdAt: new Date(data.createdAt).toDateString(),
            story_assignee: data.story_assignee,
            story_description: data.story_description,
            user_detail: {
                firstName: data.user_detail.firstName
            },
            storyStatus: data.story_status ? data.story_status : 0
        };
        this.getCommentsByStory(data.story_id);
        this.getLabelByStory(data.story_id);
    };
    TasksHomeComponent.prototype.loadSelectedNav = function (selectedNav) {
        this.selectedNav = selectedNav;
        switch (this.selectedNav) {
            case 'myTask':
                this.getAllStories();
                break;
            case 'completedTask':
                this.getCompletedTasks();
                break;
            case 'currentTask':
                this.getCurrentTasks();
                break;
            case 'backLog':
                this.getBackLogTasks();
                break;
            case 'blockedTask':
                this.getBlockedTasks();
                break;
            case 'team':
                this.getTeamList();
                break;
            case 'settings':
                this.getProjectSettings();
                break;
        }
    };
    TasksHomeComponent.prototype.getCompletedTasks = function () {
        var _this = this;
        this.storyService.getStoryByStatus(this.project_id, [4])
            .subscribe(function (completedTasks) {
            _this.storyData = completedTasks.StoryList;
            if (_this.storyData && _this.storyData.length) {
                console.log('this.storyData----', _this.storyData);
                _this.buildStoryDetailsView(_this.storyData[0], 0);
            }
            else {
                _this.noStoryString = "No stories are available";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getCurrentTasks = function () {
        var _this = this;
        this.storyService.getStoryByStatus(this.project_id, [2, 3])
            .subscribe(function (currentTasks) {
            _this.storyData = currentTasks.StoryList;
            console.log('this.storyData----', _this.storyData);
            if (_this.storyData && _this.storyData.length) {
                _this.buildStoryDetailsView(_this.storyData[0], 0);
            }
            else {
                _this.noStoryString = "No stories are available";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getBackLogTasks = function () {
        var _this = this;
        this.storyService.getStoryByStatus(this.project_id, [1])
            .subscribe(function (backLogTasks) {
            _this.storyData = backLogTasks.StoryList;
            if (_this.storyData && _this.storyData.length) {
                console.log('this.storyData----', _this.storyData);
                _this.buildStoryDetailsView(_this.storyData[0], 0);
            }
            else {
                _this.noStoryString = "No stories are available";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getBlockedTasks = function () {
        var _this = this;
        this.storyService.getStoryByStatus(this.project_id)
            .subscribe(function (blockedTasks) {
            _this.blockedTasks = blockedTasks;
            console.log('blockedTasks tasks--', _this.blockedTasks);
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getTeamList = function () {
        this.router.navigate(['/project-members', this.project_id]);
    };
    TasksHomeComponent.prototype.getProjectSettings = function () {
        this.router.navigate(['/project-settings', this.project_id]);
    };
    TasksHomeComponent.prototype.updateStoryStatus = function (status, storyId) {
        var _this = this;
        var storyStatusData = {
            story_status: status,
            story_id: storyId
        };
        this.storyService.updateStoryStatus(JSON.stringify(storyStatusData))
            .subscribe(function (storyStatus) {
            _this.storyStatus = storyStatus;
            if (_this.storyStatus.status) {
                _this.data.storyStatus = status;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.addComment = function (comment, storyId) {
        var _this = this;
        var commentData = {
            story_id: storyId,
            story_comment: comment,
            user_id: 1
        };
        this.storyService.addStoryComment(JSON.stringify(commentData))
            .subscribe(function (storyComment) {
            _this.storyCommentData = storyComment;
            _this.getCommentsByStory(storyId);
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getCommentsByStory = function (storyId) {
        var _this = this;
        this.storyService.fetchStoryCommentsById(storyId)
            .subscribe(function (commentList) {
            _this.commentsList = commentList.commentsList;
            console.log('comments list----', _this.commentsList);
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getFormattedDate = function (date) {
        return new Date(date).toDateString();
    };
    TasksHomeComponent.prototype.addLabel = function (label, storyId) {
        var _this = this;
        var data = {
            story_label: label,
            story_id: storyId
        };
        this.storyService.addStoryLabel(JSON.stringify(data))
            .subscribe(function (storyLabel) {
            _this.storyLabelData = storyLabel;
            _this.getLabelByStory(storyId);
            _this.clearLabelText = '';
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent.prototype.getLabelByStory = function (storyId) {
        var _this = this;
        this.storyService.fetchStoryByLabel(storyId)
            .subscribe(function (storyLabelList) {
            _this.storyLabelList = storyLabelList.labelList;
        }, function (error) { return _this.errorMessage = error; });
    };
    TasksHomeComponent = __decorate([
        core_1.Component({
            selector: 'pt-tasks-home',
            template: require('./tasks-home.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./tasks-home.css').toString()
            ],
            providers: [story_service_1.StoryService, storage_service_1.StorageService, project_member_service_1.ProjectMemberService]
        }), 
        __metadata('design:paramtypes', [story_service_1.StoryService, router_2.ActivatedRoute, project_member_service_1.ProjectMemberService, router_1.Router])
    ], TasksHomeComponent);
    return TasksHomeComponent;
}());
exports.TasksHomeComponent = TasksHomeComponent;
//# sourceMappingURL=tasks-home.js.map
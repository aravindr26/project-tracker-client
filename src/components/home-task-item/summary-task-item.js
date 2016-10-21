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
 * Created by aravind on 4/9/16.
 */
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var story_service_1 = require('../../services/story.service');
var TaskSummaryItemComponent = (function () {
    function TaskSummaryItemComponent(storyService) {
        this.storyService = storyService;
    }
    TaskSummaryItemComponent.prototype.ngOnInit = function () {
        this.getAllTasks();
    };
    TaskSummaryItemComponent.prototype.getAllTasks = function () {
        var _this = this;
        this.storyService.fetchStoryListByUser()
            .subscribe(function (storyList) {
            _this.storyList = storyList.StoryList;
        }, function (error) { return _this.errorMessage = error; });
    };
    TaskSummaryItemComponent = __decorate([
        core_1.Component({
            selector: 'pt-summary-task-item',
            template: require('./summary-task-item.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./summary-task-item.css').toString()
            ],
            providers: [story_service_1.StoryService]
        }), 
        __metadata('design:paramtypes', [story_service_1.StoryService])
    ], TaskSummaryItemComponent);
    return TaskSummaryItemComponent;
}());
exports.TaskSummaryItemComponent = TaskSummaryItemComponent;
//# sourceMappingURL=summary-task-item.js.map
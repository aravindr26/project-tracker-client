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
 * Created by aravind on 28/8/16.
 */
var core_1 = require('@angular/core');
var app_routing_1 = require('../src/routes/app.routing');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var angular2_highcharts_1 = require('angular2-highcharts');
var app_component_1 = require('./app/app.component');
var login_1 = require('./components/login/login');
var forgot_password_1 = require('./components/forgot-password/forgot.password');
var register_1 = require('./components/register/register');
var peojects_home_1 = require('./components/projects-home/peojects-home');
var header_1 = require("./components/header/header");
var summary_task_item_1 = require("./components/home-task-item/summary-task-item");
var project_item_1 = require("./components/project-item/project-item");
var task_summary_list_1 = require("./components/home-task-list/task-summary-list");
var project_member_1 = require("./components/project-member/project-member");
var project_settings_1 = require("./components/project-settings/project-settings");
var projects_list_1 = require("./components/projects-list/projects-list");
var tasks_home_1 = require("./components/tasks-home/tasks-home");
var user_tasks_status_1 = require('./components/tasks-overall-status/user-tasks-status');
var Bootstrap = (function () {
    function Bootstrap() {
    }
    Bootstrap = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule,
                angular2_highcharts_1.ChartModule
            ],
            declarations: [app_component_1.AppComponent,
                header_1.HeaderComponent,
                summary_task_item_1.TaskSummaryItemComponent,
                project_item_1.ProjectItemComponent,
                project_member_1.ProjectMembers,
                project_settings_1.ProjectSettings,
                peojects_home_1.ProjectsHomeComponent,
                projects_list_1.ProjectListComponent,
                tasks_home_1.TasksHomeComponent,
                login_1.LoginComponent,
                task_summary_list_1.TaskSummaryListComponent,
                forgot_password_1.ForgotPassword,
                register_1.RegisterComponent,
                peojects_home_1.ProjectsHomeComponent,
                user_tasks_status_1.UserTasksStatus
            ],
            providers: [
                app_routing_1.appRoutingProviders,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Bootstrap);
    return Bootstrap;
}());
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map
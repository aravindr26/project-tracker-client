/**
 * Created by aravind on 29/8/16.
 */
"use strict";
var router_1 = require('@angular/router');
var register_1 = require('../components/register/register');
var login_1 = require('../components/login/login');
var forgot_password_1 = require('../components/forgot-password/forgot.password');
var peojects_home_1 = require('../components/projects-home/peojects-home');
var tasks_home_1 = require('../components/tasks-home/tasks-home');
var project_member_1 = require("../components/project-member/project-member");
var project_settings_1 = require("../components/project-settings/project-settings");
exports.appRoutes = [{
        path: '',
        component: login_1.LoginComponent
    }, {
        path: 'register',
        component: register_1.RegisterComponent
    }, {
        path: 'forgot-password',
        component: forgot_password_1.ForgotPassword,
    }, {
        path: 'projects-home',
        component: peojects_home_1.ProjectsHomeComponent,
    }, {
        path: 'tasks-home/:id',
        component: tasks_home_1.TasksHomeComponent
    }, {
        path: 'project-members/:id',
        component: project_member_1.ProjectMembers
    }, {
        path: 'project-settings/:id',
        component: project_settings_1.ProjectSettings
    }];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes);
//# sourceMappingURL=app.routing.js.map
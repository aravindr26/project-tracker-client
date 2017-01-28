/**
 * Created by aravind on 28/8/16.
 */
import { NgModule }      from '@angular/core';
import { routing, appRoutingProviders} from '../src/routes/app.routing';
import { BrowserModule } from '@angular/platform-browser';
import {
    LocationStrategy,
    HashLocationStrategy
} from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import '../node_modules/chart.js/dist/Chart.bundle.min.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent }  from './app/app.component';
import { LoginComponent } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot.password';
import { RegisterComponent } from './components/register/register';
import { ProjectsHomeComponent } from './components/projects-home/peojects-home';
import {HeaderComponent} from "./components/header/header";
import {TaskSummaryItemComponent} from "./components/home-task-item/summary-task-item";
import {ProjectItemComponent} from "./components/project-item/project-item";
import {TaskSummaryListComponent} from "./components/home-task-list/task-summary-list";
import {ProjectMembers} from "./components/project-member/project-member";
import {ProjectSettings} from "./components/project-settings/project-settings";
import {ProjectListComponent} from "./components/projects-list/projects-list";
import {TasksHomeComponent} from "./components/tasks-home/tasks-home";
import {UserTasksStatus} from './components/tasks-overall-status/user-tasks-status';
import {UserProfile} from './components/user-profile/user-profile';
import { AccountRecovery } from "./components/account-recovery/account-recovery";

@NgModule({
    imports:      [ BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        ChartsModule
    ],
    declarations: [ AppComponent,
        HeaderComponent,
        TaskSummaryItemComponent,
        ProjectItemComponent,
        ProjectMembers,
        ProjectSettings,
        ProjectsHomeComponent,
        ProjectListComponent,
        TasksHomeComponent,
        LoginComponent,
        TaskSummaryListComponent,
        ForgotPassword,
        RegisterComponent,
        ProjectsHomeComponent,
        UserTasksStatus,
        UserProfile,
        AccountRecovery
    ],
    providers: [
        appRoutingProviders,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap:    [ AppComponent ]
})
export class Bootstrap { }

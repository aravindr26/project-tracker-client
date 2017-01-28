/**
 * Created by aravind on 29/8/16.
 */

import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../components/register/register';
import { LoginComponent } from '../components/login/login';
import { ForgotPassword } from '../components/forgot-password/forgot.password';
import { ProjectsHomeComponent } from '../components/projects-home/peojects-home';
import { TasksHomeComponent } from '../components/tasks-home/tasks-home';
import { ProjectMembers } from "../components/project-member/project-member";
import { ProjectSettings } from "../components/project-settings/project-settings";
import { UserProfile } from "../components/user-profile/user-profile";
import { AccountRecovery } from "../components/account-recovery/account-recovery";

export const appRoutes: Routes = [{
    path: '',
    component: LoginComponent
}, {
    path: 'register',
    component: RegisterComponent
}, {
    path: 'forgot-password',
    component: ForgotPassword,
}, {
    path: 'projects-home',
    component: ProjectsHomeComponent,
}, {
    path: 'tasks-home/:id',
    component: TasksHomeComponent
}, {
    path: 'project-members/:id',
    component: ProjectMembers
}, {
    path: 'project-settings/:id',
    component: ProjectSettings
}, {
    path: 'profile',
    component: UserProfile
}, {
    path: 'forgot-link/:id',
    component: AccountRecovery
}];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
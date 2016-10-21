/**
 * Created by aravind on 4/9/16.
 */

import {Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { ProjectDetails } from '../../models/ProjectDetails';

@Component({
    selector: 'pt-projects-list',
    template: require('./projects-list.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./projects-list.css').toString()
    ],
    providers: [ProjectService]
})

export class ProjectListComponent implements OnInit{
    private errorMessage: string;
    private projectStatus: User;
    private statusMessage: string;
    private alertMessageClass: string;
    private projectDetails: ProjectDetails;
    constructor(private projectService: ProjectService) {}
    ngOnInit() {
       this.fetchTopProjects();
    }

    fetchTopProjects() {
        this.projectService.getTopProjects()
            .subscribe(
                projectList => {
                    this.projectDetails = projectList.projects;
                },
                error =>{
                    console.log(error);
                }
            )
    }

    addProject(projectObj) {
        let projectObject = JSON.stringify(projectObj);
        this.projectService.createProject(projectObject)
            .subscribe(
                projectData => {
                    this.projectStatus = projectData;
                    this.statusMessage = projectData.message;
                    this.alertMessageClass = projectData.status ? 'alert-success': '';
                    this.fetchTopProjects();
                },
                error => this.errorMessage = error
            )
    }

}
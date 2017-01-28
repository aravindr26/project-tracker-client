/**
 * Created by aravind on 4/9/16.
 */

import {Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { ProjectDetails } from '../../models/ProjectDetails';
import { StorageService} from '../../services/storage.service';

@Component({
    selector: 'pt-projects-list',
    template: require('./projects-list.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./projects-list.css').toString()
    ],
    providers: [ProjectService, StorageService]
})

export class ProjectListComponent implements OnInit{
    private errorMessage: string;
    private projectStatus: User;
    private statusMessage: string;
    private alertMessageClass: string;
    private projectDetails: ProjectDetails;
    private featureCount: number = 0;
    private bugCount: number = 0;
    private user_id:string;
    totalBugs: number = 0;
    totalFeatures: number = 0;
    constructor(private projectService: ProjectService,
                private storageService: StorageService) {}
    ngOnInit() {
       this.user_id = this.storageService.getData('userId');
       this.fetchTopProjects();
    }

    fetchTopProjects() {
        this.projectService.getTopProjects()
            .subscribe(
                projectList => {
                    for(var j=0;j<projectList.projects.length;j++){
                      this.featureCount = 0;
                      this.bugCount = 0;
                      for(var i=0;i<projectList.projects[j].story_details.length;i++) {
                        if(projectList.projects[j].story_details[i].story_type === "1") {
                          this.featureCount = this.featureCount + 1;
                        } else {
                            this.bugCount += 1;
                        }
                      }
                    projectList.projects[j].featureCount = this.featureCount;
                    projectList.projects[j].bugCount = this.bugCount;
                    projectList.projects[j].totalCount = projectList.projects[j].story_details.length;
                    this.totalBugs += this.bugCount;
                    this.totalFeatures += this.featureCount;
                    }
                    this.projectDetails = projectList.projects;
                    this.storageService.setData('featureCount', this.totalFeatures);
                    this.storageService.setData('BugCount', this.totalBugs);
                },
                error =>{
                    console.log(error);
                }
            )
    }

    addProject(projectObj) {
        projectObj.user_id = this.user_id;
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
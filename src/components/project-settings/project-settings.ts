/**
 * Created by aravind on 21/9/16.
 */


import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { ProjectService } from '../../services/project.service';
import { StorageService } from '../../services/storage.service';
import { StoryService } from '../../services/story.service';
import {error} from "util";

@Component({
    selector: 'pt-project-settings',
    template: require('./project-settings.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./project-settings.css').toString()
    ],
    providers: [ProjectService, StorageService, StoryService]
})

export class ProjectSettings implements OnInit{
    private project_id: number;
    private params: any;
    private errorMessage:string;
    private projectData: any;
    private updatedData: any;
    private projectSettingsData: any;
    private projectSettings: any;
    private projectName: string;
    private projectDescription: string;
    private startDate: string;
    private endDate: string;
    private projectSprintDay:string;
    private projectSprintDuration:number;
    private storyType: any;
    private storyStatus: any;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private projectService: ProjectService,
                private storyService: StoryService){}

    ngOnInit() {
        this.projectName ='';
        this.projectDescription ='';
        this.startDate = '';
        this.endDate = '';
        this.projectSprintDay = '';
        this.projectSprintDuration = 0;
        this.getURLParam();
        this.getProjectDetails();
        this.getProjectSettings();
    }

    getURLParam() {
        this.params = this.activatedRoute.params
            .subscribe(
                params => {
                    this.project_id = parseInt(params['id'], 10);
                }
            );
    }

    getProjectDetails() {
        this.projectService.getProjectDataById(this.project_id)
            .subscribe(
                projectData=> {
                    this.projectData = projectData;
                    if (this.projectData.ProjectData) {
                        this.projectName = this.projectData.ProjectData.project_name;
                        this.projectDescription = this.projectData.ProjectData.project_description;
                    }
                    console.log('getting project data----', projectData);
                },
                error=> this.errorMessage = error
            )
    }

    updateProjectData(projectData) {
        projectData['project_id'] = this.project_id;
        this.projectService.updateProjectDetails(JSON.stringify(projectData))
            .subscribe(
                projectData=> {
                    this.updatedData = projectData;
                },
                error=> this.errorMessage =error
            )
    }

    saveProjectSettings(projectData){
        projectData['project_id'] = this.project_id;
        console.log('data in settings----',projectData);
        this.projectService.saveProjectSettings(JSON.stringify(projectData))
            .subscribe(
                projectSettings=>{
                    this.projectSettings = projectSettings;
                },
                error=> this.errorMessage =error
            )
    }

    getProjectSettings() {
        this.projectService.fetchProjectSettings(this.project_id)
            .subscribe(
                projectSettingsData=> {
                    this.projectSettingsData = projectSettingsData;
                    if(this.projectSettingsData.ProjectData) {
                        this.startDate = (this.projectSettingsData.ProjectData.project_start_date).split('T')[0];
                        this.endDate = (this.projectSettingsData.ProjectData.project_end_date).split('T')[0];
                        this.projectSprintDay = this.projectSettingsData.ProjectData.project_sprint_starts_on;
                        this.projectSprintDuration = this.projectSettingsData.ProjectData.project_sprint_duration;
                    }
                },
                error=> this.errorMessage =error
            )
    }

    saveStoryType(type) {
      this.storyService.addStoryType(JSON.stringify(type))
          .subscribe(
              storyType=>{
                  this.storyType = storyType;
              },
              error=> this.errorMessage =error
          )
    }

    saveStoryStatus(status) {
      this.storyService.addStoryStatus(JSON.stringify(status))
          .subscribe(
              storyStatus=> {
                  this.storyStatus = storyStatus;
              }, error=> this.errorMessage = error
          )
    }
}
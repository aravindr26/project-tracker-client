/**
 * Created by aravind on 4/9/16.
 */
import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ProjectDetails } from '../../models/ProjectDetails';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'pt-project-item',
    template: require('./project-item.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./project-item.css').toString()
    ],
    providers: [ProjectService]
})

export class ProjectItemComponent {
    constructor(private projectService:ProjectService){}
    @Input() projectList: ProjectDetails;

    private deleteStatus: string;
    deleteProject(project_id) {
        this.projectService.deleteProject(project_id)
        .subscribe(
            deleteStatus=>{
                this.deleteStatus = deleteStatus.status;
            }
        )
    }
}
/**
 * Created by aravind on 4/9/16.
 */
import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ProjectDetails } from '../../models/ProjectDetails';

@Component({
    selector: 'pt-project-item',
    template: require('./project-item.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./project-item.css').toString()
    ]
})

export class ProjectItemComponent {
    @Input() projectList: ProjectDetails;
}
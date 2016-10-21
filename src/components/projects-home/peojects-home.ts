/**
 * Created by aravind on 3/9/16.
 */
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'pt-projects-home',
    template: require('./projects-home.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./projects-home.css').toString()
    ],
    providers: [StorageService]
})

export class ProjectsHomeComponent {}
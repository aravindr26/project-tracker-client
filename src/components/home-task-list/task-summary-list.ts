/**
 * Created by aravind on 4/9/16.
 */
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pt-task-summary-list',
    template: require('./task-summary-list.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./task-summary-list.css').toString()
    ]
})

export class TaskSummaryListComponent {}
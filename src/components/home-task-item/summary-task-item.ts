/**
 * Created by aravind on 4/9/16.
 */
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
    selector: 'pt-summary-task-item',
    template: require('./summary-task-item.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./summary-task-item.css').toString()
    ],
    providers: [StoryService]
})

export class TaskSummaryItemComponent implements OnInit{

    private errorMessage: string;
    private storyList: any;
    constructor(private storyService: StoryService) {}
    ngOnInit() {
        this.getAllTasks();
    }

    getAllTasks() {
        this.storyService.fetchStoryListByUser()
            .subscribe(
                storyList=> {
                   this.storyList= storyList.StoryList;
                },
                error=> this.errorMessage =error
            )
    }
}
/**
 * Created by aravind on 16/10/16.
 */
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { StorageService} from '../../services/storage.service';

@Component({
    selector: 'pt-user-tasks-status',
    template: require('./user-tasks-status.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./user-tasks-status.css').toString()
    ],
    providers: [StoryService, StorageService]
})

export class UserTasksStatus implements OnInit{
  constructor(private storageService:StorageService,
              private storyService: StoryService){}

 ngOnInit(){
   this.storyService.getStoryCount()
   .subscribe(
     taskCount=>{
       console.log('=======', taskCount);
       this.bugCount = taskCount.bugCount;
       this.featureCount = taskCount.featureCount;
       this.buildChartData();
     }
   )
 }

 // Doughnut
  public doughnutChartLabels:string[] = ['Bugs', 'Features'];
  public doughnutChartData:number[] =[0,0];
  public doughnutChartType:string = 'pie';
  private bugCount: number;
  private featureCount: number;

 buildChartData(){
   this.doughnutChartLabels = ['Bugs', 'Features'];
   this.doughnutChartData = [this.bugCount, this.featureCount];
   
 }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
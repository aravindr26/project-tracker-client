/**
 * Created by aravind on 21/9/16.
 */


import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProjectMemberService} from "../../services/project.member.service";
import {StorageService} from '../../services/storage.service';
import { MemberList } from '../../models/MemberList';
import { MemberInfo } from '../../models/MemberInfo';
import { FileExport } from '../../services/file.export';

@Component({
    selector: 'pt-project-members',
    template: require('./project-member.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./project-member.css').toString()
    ],
    providers: [ProjectMemberService, StorageService, FileExport]
})

export class ProjectMembers implements OnInit{

    private errorMessage: any;
    private memberStatus: any;
    private project_id: number;
    private memberList: MemberList;
    private addMemberData: MemberInfo;
    private params: any;
    private exportMemberData:any;
    constructor(private memberService: ProjectMemberService,
                private activatedRoute: ActivatedRoute,
                private fileExport: FileExport) {}
    ngOnInit() {
        this.addMemberData = {
            projectMemberEmail: '',
            projectMemberRole: ''
        };
        this.getURLParam();
        this.getProjectMembers();
    }
    getProjectMembers() {
      this.memberService.getAllMember(this.project_id)
          .subscribe(
              memberDetails => {
                  this.memberList = memberDetails.member_list;
              },
              error=> this.errorMessage =error
          )
    }

    getURLParam() {
        this.params = this.activatedRoute.params
            .subscribe(
                params => {
                    this.project_id = parseInt(params['id'], 10);
                }
            );
    }
    addProjectMember(member) {
        member.project_id = this.project_id;
        let memberDetails = JSON.stringify(member);
        console.log(memberDetails);
        this.memberService.addMember(memberDetails).
            subscribe(
                memberData=>{
                    this.memberStatus = memberData;
                },
                error=> this.errorMessage = error
        )
    }

    exportMemberList() {
      var projectData = {
           "project_id":this.project_id
      };
      this.memberService.exportmemberData(JSON.stringify(projectData))
      .subscribe(
         exportData =>{
           this.exportMemberData = exportData;
           this.fileExport.exportFile(exportData._body, 'member-data.csv');
         },
         error=> this.errorMessage = error
      )
    }
}
/**
 * Created by aravind on 21/9/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var project_member_service_1 = require("../../services/project.member.service");
var storage_service_1 = require('../../services/storage.service');
var ProjectMembers = (function () {
    function ProjectMembers(memberService, activatedRoute) {
        this.memberService = memberService;
        this.activatedRoute = activatedRoute;
    }
    ProjectMembers.prototype.ngOnInit = function () {
        this.addMemberData = {
            projectMemberEmail: '',
            projectMemberRole: ''
        };
        this.getURLParam();
        this.getProjectMembers();
    };
    ProjectMembers.prototype.getProjectMembers = function () {
        var _this = this;
        this.memberService.getAllMember(this.project_id)
            .subscribe(function (memberDetails) {
            _this.memberList = memberDetails.member_list;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectMembers.prototype.getURLParam = function () {
        var _this = this;
        this.params = this.activatedRoute.params
            .subscribe(function (params) {
            _this.project_id = parseInt(params['id'], 10);
        });
    };
    ProjectMembers.prototype.addProjectMember = function (member) {
        var _this = this;
        member.project_id = this.project_id;
        var memberDetails = JSON.stringify(member);
        console.log(memberDetails);
        this.memberService.addMember(memberDetails).
            subscribe(function (memberData) {
            _this.memberStatus = memberData;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProjectMembers = __decorate([
        core_1.Component({
            selector: 'pt-project-members',
            template: require('./project-member.html'),
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                require('./project-member.css').toString()
            ],
            providers: [project_member_service_1.ProjectMemberService, storage_service_1.StorageService]
        }), 
        __metadata('design:paramtypes', [project_member_service_1.ProjectMemberService, router_1.ActivatedRoute])
    ], ProjectMembers);
    return ProjectMembers;
}());
exports.ProjectMembers = ProjectMembers;
//# sourceMappingURL=project-member.js.map
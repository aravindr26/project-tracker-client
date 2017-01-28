import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from "../../services/storage.service";

@Component({
    selector: 'pt-user-profile',
    template: require('./user-profile.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./user-profile.css').toString()
    ],
    providers: [AuthenticationService, StorageService]
})

export class UserProfile implements OnInit {
    private user_id:string;
    private first_name:string;
    private last_name:string;
    private email:string;
    private phone:string;
   constructor(private authService:AuthenticationService,
               private storageService:StorageService) {}
   ngOnInit() {
     this.user_id = this.storageService.getData('userId');
     this.fetchUserDetailsById();
   }

   fetchUserDetailsById() {
     this.authService.fetchUserDataById(this.user_id)
     .subscribe(
         userData => {
             this.userInfo = userData;
             this.first_name = userData.userInfo.firstName;
             this.last_name = userData.userInfo.lastName;
             this.email = userData.userInfo.email;
             this.phone = userData.userInfo.phoneNumber;
         }
     )
   }

   private alertMessageClass:string;
   private updateMessage:string;
   updateUserData(){
       var userData = {
           userId: this.user_id,
           firstName: this.first_name,
           lastName: this.last_name,
           phoneNumber: this.phone,
           email: this.email
       };
       this.authService.updateUserData(JSON.stringify(userData))
       .subscribe(
           userData => {
               this.userData = userData;
               this.updateMessage = userData.message;
               this.alertMessageClass = this.userData.status ? 'alert-success': '';
               this.fetchUserDetailsById();
           }
       )
   }
}
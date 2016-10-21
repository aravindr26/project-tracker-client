/**
 * Created by aravind on 29/8/16.
 */

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from "../../services/storage.service";
import { UserLogin } from "../../models/UserLogin";


@Component({
    selector: 'pt-login',
    template: require('./login.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./login.css').toString()
    ],
    providers: [AuthenticationService, StorageService]
})

export class LoginComponent implements OnInit{
    public errorMessage: string;
    public loginObj: any;
    public userObj: UserLogin;

    constructor(private authService: AuthenticationService,
                private router:Router,
                public storageService: StorageService){}

    ngOnInit() {
      this.userObj= {
        email: '',
        password: ''
      };
    }

    userLogin(userData: UserLogin) {
      let userObject = JSON.stringify(userData);
      this.authService.checkUserLogin(userObject).
        subscribe(
            userData => {
              this.loginObj = userData;
              if (this.loginObj.status) {
                 this.storageService.setData('authToken', this.loginObj.token);
                  this.storageService.setData('userId', this.loginObj.userId);
                  this.storageService.setData('userName', this.loginObj.userName);
                 this.router.navigate(['/projects-home']);
              } else {
                  alert(this.loginObj.message);
              }
            },
            error => this.errorMessage = <any> error
      )
    }
}

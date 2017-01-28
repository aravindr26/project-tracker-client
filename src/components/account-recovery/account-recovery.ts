/**
 * Created by aravind on 3/9/16.
 */

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from "../../services/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'pt-account-recovery',
    template: require('./account-recovery.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./account-recover.css').toString()
    ],
    viewProviders: [AuthenticationService, StorageService]
})

export class AccountRecovery implements OnInit {
    constructor(private authService: AuthenticationService,
                private activatedRoute:ActivatedRoute){}
    user_id: string;
    user_token: string;
    params: any;
    updatedMessage: string;
    ngOnInit() {
        this.params = this.activatedRoute.params
            .subscribe(
                params => {
                    this.user_id = params['id'];
                    this.user_token = this.user_id.replace(/#/g, "/");
                }
            );
    }

    changePassword(pwd, confirmPwd) {
        var data = {
          user_token: this.user_token,
          password: pwd
        };
        if(pwd === confirmPwd) {
            this.authService.updatePassword(JSON.stringify(data))
            .subscribe(
                updatedPassword=> {
                    this.updatedMessage = updatedPassword
                },
                error => this.updatedMessage = error
            )
        } else {
          this.updatedMessage = "password mismatch";
        }
    }
}
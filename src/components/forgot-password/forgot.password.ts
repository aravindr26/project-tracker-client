/**
 * Created by aravind on 3/9/16.
 */

import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from "../../services/storage.service";

@Component({
    selector: 'pt-forgot-password',
    template: require('./forgot.password.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./forgot.password.css').toString()
    ],
    viewProviders: [AuthenticationService, StorageService]
})

export class ForgotPassword {
    constructor(private authService: AuthenticationService){}
    private email: string;
    private link: string;
    sendForgotLink(email) {
        console.log('email===', email, '---', this.email);
     this.authService.sendForgotLink(email).subscribe(
         forgotLink =>{
           this.link = forgotLink;
         }
     )
    }
}
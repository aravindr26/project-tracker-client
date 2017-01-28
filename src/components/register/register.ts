/**
 * Created by aravind on 29/8/16.
 */

import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService} from '../../services/storage.service';
import { User } from '../../models/user';

@Component({
    selector: 'pt-register',
    template: require('./register.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./register.css').toString()
    ],
    providers: [AuthenticationService, StorageService]
})

export class RegisterComponent{
    errorMessage: string;
    user: User;
    message: String;

    constructor(private authService: AuthenticationService){}

    userRegistration(userObj)  {
        let userObject = JSON.stringify(userObj)
        this.authService.addUserData(userObject)
            .subscribe(
                userData =>{
                    this.user = userData;
                    this.message = userData.message;
                },
                error => this.errorMessage = <any> error
            )
    }
}

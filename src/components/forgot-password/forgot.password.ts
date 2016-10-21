/**
 * Created by aravind on 3/9/16.
 */

import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pt-forgot-password',
    template: require('./forgot.password.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./forgot.password.css').toString()
    ]
})

export class ForgotPassword {}
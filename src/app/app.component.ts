/**
 * Created by aravind on 28/8/16.
 */

import {Component} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pt-app',
    template: require('./app.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.css').toString()
    ],
})

export class AppComponent{}
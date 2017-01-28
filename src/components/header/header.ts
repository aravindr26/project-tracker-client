/**
 * Created by aravind on 30/8/16.
 */

import { Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router} from '@angular/router';

@Component({
    selector: 'pt-header',
    template: require('./header.html'),
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./header.css').toString() //<-- Including the style
    ],
    providers: [StorageService]
})

export class HeaderComponent implements OnInit{
    private userName:String;
    constructor(private storageService:StorageService,
                private router: Router) {}
    ngOnInit() {
        this.userName = this.storageService.getData('userName');
        console.log('userName---', this.userName);
    }

    logout() {
        this.storageService.removeData('authToken');
        this.storageService.removeData('userName');
        this.storageService.removeData('userId');
        this.router.navigate(['']);
    }
}

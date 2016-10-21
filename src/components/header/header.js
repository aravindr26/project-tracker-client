/**
 * Created by aravind on 30/8/16.
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
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var storage_service_1 = require('../../services/storage.service');
var router_1 = require('@angular/router');
var HeaderComponent = (function () {
    function HeaderComponent(storageService, router) {
        this.storageService = storageService;
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.userName = this.storageService.getData('userName');
    };
    HeaderComponent.prototype.logout = function () {
        this.storageService.removeData('authToken');
        this.storageService.removeData('userName');
        this.storageService.removeData('userId');
        this.router.navigate(['']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'pt-header',
            template: require('./header.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./header.css').toString() //<-- Including the style
            ],
            providers: [storage_service_1.StorageService]
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.js.map
/**
 * Created by aravind on 29/8/16.
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
var router_1 = require('@angular/router');
var core_2 = require('@angular/core');
var authentication_service_1 = require('../../services/authentication.service');
var storage_service_1 = require("../../services/storage.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router, storageService) {
        this.authService = authService;
        this.router = router;
        this.storageService = storageService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userObj = {
            email: '',
            password: ''
        };
    };
    LoginComponent.prototype.userLogin = function (userData) {
        var _this = this;
        var userObject = JSON.stringify(userData);
        this.authService.checkUserLogin(userObject).
            subscribe(function (userData) {
            _this.loginObj = userData;
            if (_this.loginObj.status) {
                _this.storageService.setData('authToken', _this.loginObj.token);
                _this.storageService.setData('userId', _this.loginObj.userId);
                _this.storageService.setData('userName', _this.loginObj.userName);
                _this.router.navigate(['/projects-home']);
            }
            else {
                alert(_this.loginObj.message);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'pt-login',
            template: require('./login.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./login.css').toString()
            ],
            providers: [authentication_service_1.AuthenticationService, storage_service_1.StorageService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router, storage_service_1.StorageService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map
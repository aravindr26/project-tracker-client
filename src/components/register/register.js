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
var core_2 = require('@angular/core');
var authentication_service_1 = require('../../services/authentication.service');
var RegisterComponent = (function () {
    function RegisterComponent(authService) {
        this.authService = authService;
    }
    RegisterComponent.prototype.userRegistration = function (userObj) {
        var _this = this;
        var userObject = JSON.stringify(userObj);
        this.authService.addUserData(userObject)
            .subscribe(function (userData) {
            _this.user = userData;
            _this.message = userData.message;
        }, function (error) { return _this.errorMessage = error; });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'pt-register',
            template: require('./register.html'),
            encapsulation: core_2.ViewEncapsulation.None,
            styles: [
                require('./register.css').toString()
            ],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.js.map
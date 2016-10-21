/**
 * Created by aravind on 1/10/16.
 */
"use strict";
var MemberList = (function () {
    function MemberList(userId, firstName, lastName, email, role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
    return MemberList;
}());
exports.MemberList = MemberList;
//# sourceMappingURL=MemberList.js.map
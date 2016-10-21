/**
 * Created by aravind on 19/9/16.
 */
"use strict";
var ProjectDetails = (function () {
    function ProjectDetails(project_name, projects, project_id, project_description) {
        this.project_name = project_name;
        this.projects = projects;
        this.project_id = project_id;
        this.project_description = project_description;
    }
    return ProjectDetails;
}());
exports.ProjectDetails = ProjectDetails;
//# sourceMappingURL=ProjectDetails.js.map
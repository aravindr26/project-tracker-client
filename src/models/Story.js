"use strict";
/**
 * Created by aravind on 11/10/16.
 */
var Story = (function () {
    function Story(story_id, story_summery, story_type, story_priority, story_point, story_assignee, story_description, story_status, user_detail, createdAt, StoryList, storyStatus) {
        this.story_id = story_id;
        this.story_summery = story_summery;
        this.story_type = story_type;
        this.story_priority = story_priority;
        this.story_point = story_point;
        this.story_assignee = story_assignee;
        this.story_description = story_description;
        this.story_status = story_status;
        this.user_detail = user_detail;
        this.createdAt = createdAt;
        this.StoryList = StoryList;
        this.storyStatus = storyStatus;
    }
    return Story;
}());
exports.Story = Story;
//# sourceMappingURL=Story.js.map
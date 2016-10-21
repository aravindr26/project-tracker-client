/**
 * Created by aravind on 11/10/16.
 */
export class Story {
    constructor(public story_id:number,
                public story_summery: string,
                public story_type:string,
                public story_priority: number,
                public story_point: number,
                public story_assignee: string,
                public story_description: string,
                public story_status:string,
                public user_detail: any,
                public createdAt: string,
                public StoryList: any,
                public storyStatus: any
    ){}
}

import {makeAutoObservable} from "mobx";

export default class FollowUsersPostsStore {
    constructor() {
        this._posts = []
        makeAutoObservable(this)
    }

    setPosts(posts){
        this._posts = posts
    }

    get posts() {
        return this._posts
    }
}
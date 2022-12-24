import {makeAutoObservable} from "mobx";
import {getFollowedUsersPosts} from "../http/postApi";
import {useContext} from "react";
import {Context} from "../index";
import {$authHost} from "../http";
import jwt_decode from "jwt-decode";

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
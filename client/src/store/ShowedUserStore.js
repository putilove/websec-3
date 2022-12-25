import {makeAutoObservable} from "mobx";

export default class ShowedUserStore {
    constructor() {
        this._userId = parseInt(window.location.search.split("=")[1])
        this._username = ''
        this._subs = 0
        this._fols = 0
        this._posts = []
        makeAutoObservable(this)
    }

    setUserId(int){
        this._userId = int
    }

    setPosts(posts){
        this._posts = posts
    }

    setSubs(subs){
        this._subs = subs
    }

    setFols(fols){
        this._fols = fols
    }

    setUsername(username){
        this._username = username
    }

    get username() {
        return this._username
    }

    get fols() {
        return this._fols
    }

    get subs() {
        return this._subs
    }

    get posts() {
        return this._posts
    }

    get userId() {
        return this._userId
    }
}
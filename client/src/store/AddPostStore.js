import {makeAutoObservable} from "mobx";

export default class AddPostStore {
    constructor() {
        this._images = []
        this._description = ''
        this._userId = ''
        makeAutoObservable(this)
    }

    setImages(images) {
        this._images = images
    }

    setDescription(description) {
        this._description = description
    }

    setUserId(userId) {
        this._userId = userId
    }

    get images() {
        return this._images
    }
    get description() {
        return this._description
    }
    get userId() {
        return this._userId
    }
}
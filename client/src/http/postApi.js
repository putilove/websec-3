import {$authHost} from "./index";


export const getFollowedUsersPosts = async (id) => {
    const {data} = await $authHost.get(`api/post/followed?id=${id}`)
    return data
}

export const getUserPosts = async (id) => {
    const {data} = await $authHost.get(`api/post/user?userId=${id}`)
    return data
}

export const createPost = async (formData) => {
    const {data} = await $authHost.post(`api/post`, formData)
    return data
}

export const deletePost = async (id) => {
    const {data} = await $authHost.delete(`api/post?id=${id}`)
    return data
}
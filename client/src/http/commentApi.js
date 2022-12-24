import {$authHost} from "./index";


export const createComment = async (postId, userId, text) => {
    const {data} = await $authHost.post(`api/comment`, { comment : {postId: postId, userId: userId, text: text} })
    return data
}

export const deleteComment = async (id) => {
    const {data} = await $authHost.delete(`api/comment?id=${id}`)
    return data
}

import {$authHost} from "./index";


export const like = async (userId, postId) => {
    const {data} = await $authHost.post(`api/like`, {userId, postId})
    return data
}

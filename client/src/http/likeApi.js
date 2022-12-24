import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'
import {getUserPosts} from "./postApi";


export const like = async (userId, postId) => {
    const {data} = await $authHost.post(`api/like`, {userId, postId})
    return data
}

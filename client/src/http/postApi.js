import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'


export const getFollowedUsersPosts = async (id) => {
    const {data} = await $authHost.get(`api/post/followed?id=${id}`)
    return data

}
import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'


export const getImagesByPostIds = async (ids) => {
    const {data} = await $authHost.post(`api/image/posts`, {ids})
    return data

}
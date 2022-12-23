import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'


export const signUp = async (username, email, password) => {
    const {data} = await $host.post('api/user/signUp', {username, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signIn = async (username, password) => {
    const {data} = await $host.post('api/user/signIn', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkAuth = async (id) => {
    const {data} = await $authHost.get(`api/user/auth`)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signOut = async (id) => {
    const {data} = await $authHost.post('api/user/signOut', {id})
    return data
}
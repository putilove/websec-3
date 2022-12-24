import {$authHost, $host} from "./index";


export const getCountFollowers = async (id) => {
    const {data} = await $authHost.get(`api/subscription/otherUser?otherUserId=${id}`)
    return data
}

export const getCountSubscriptions = async (id) => {
    const {data} = await $authHost.get(`api/subscription/user?userId=${id}`)
    return data
}

export const follow = async (id, otherId) => {
    const {data} = await $authHost.post(`api/subscription`, {id, otherId})
}
import request from '@/utils/request'

export function getRoleList(params) {
    return request({
        url: 'role/index',
        method: 'get',
        params,
    })
}

export function addRoles(params) {
    const url = params.id ? 'role/roleEdit' : 'role/roleAdd'
    return request({
        url: url,
        method: 'post',
        data: params,
    })
}

export function delRoles(params) {
    return request({
        url: 'role/roleDel',
        method: 'post',
        data: params,
    })
}

export function getAuth(params) {
    return request({
        url: 'role/giveAccess',
        method: 'get',
        params,
    })
}

export function setAuth(params) {
    return request({
        url: 'role/giveAccess',
        method: 'post',
        data: params,
    })
}
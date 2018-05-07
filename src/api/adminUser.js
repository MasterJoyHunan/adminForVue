import request from '@/utils/request'
export function getAdminList(params) {
    return request({
        url: 'user/index',
        method: 'get',
        params,
    })
}
export function delAdmin(params) {
    return request({
        url: 'user/userDel',
        method: 'post',
        data: params,
    })
}

export function getRegAdminInfo() {
    return request({
        url: 'user/userAdd',
        method: 'get',
    })
}

export function regAdmin(params) {
    const url = params.id ? 'user/userEdit' : 'user/userAdd'
    return request({
        url: url,
        method: 'post',
        data: params
    })
}
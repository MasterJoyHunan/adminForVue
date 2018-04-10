import request from '@/utils/request'
export function getList() {
    return request({
        url: 'data/index',
    })
}

export function back() {
    return request({
        url: 'data/backup',
    })
}

export function init() {
    return request({
        url: 'data/initData',
    })
}

export function restore(params) {
    return request({
        url: 'data/restore',
        params: params
    })
}

export function del(params) {
    return request({
        url: 'data/del',
        params: params
    })
}
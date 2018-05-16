import request from '@/utils/request'

export function getGoods(params) {
    return request({
        url: 'product/index',
        params: params
    })
}

export function getCate() {
    return request({
        url: '/product/addPro',
    })
}

export function addPro(params) {
    return request({
        url: '/product/addPro',
        method: 'post',
        data: params
    })
}

export function editPro(params) {
    return request({
        url: '/product/editPro',
        method: 'post',
        data: params
    })
}

export function delPro(params) {
    return request({
        url: '/product/delPro',
        method: 'post',
        data: params
    })
}

export function getPro(params) {
    return request({
        url: '/product/getProdetail',
        method: 'get',
        params
    })
}
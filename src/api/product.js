import request from '@/utils/request'

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
import request from '@/utils/request'
export function getCate(params) {
    return request({
        url: 'cate/index',
        params: params
    })
}

export function addCate(params) {
    return request({
        url: 'cate/addCate',
        params: params
    })
}

export function editCate(params) {
    return request({
        url: 'cate/editCate',
        params: params
    })
}

export function delCate(params) {
    return request({
        url: 'cate/delCate',
        params: params
    })
}
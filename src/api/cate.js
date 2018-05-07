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
        data: params,
        method: 'post'
    })
}

export function editCate(params) {
    return request({
        url: 'cate/editCate',
        data: params,
        method: 'post'
    })
}

export function delCate(params) {
    return request({
        url: 'cate/delCate',
        params: params
    })
}

export function addCateAttr(params) {
    return request({
        url: 'cate/addCateSku',
        params: params
    })
}

export function delCateAttr(params) {
    return request({
        url: 'cate/delCateSku',
        params: params
    })
}
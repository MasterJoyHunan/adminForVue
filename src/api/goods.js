import request from '@/utils/request'
export function getGoods(params) {
    return request({
        url: 'product/index',
        params: params
    })
}

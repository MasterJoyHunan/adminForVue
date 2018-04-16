import request from '@/utils/request'
export function getCate(params) {
    return request({
        url: 'cate/index',
        params: params
    })
}

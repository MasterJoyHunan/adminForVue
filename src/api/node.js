import request from '@/utils/request'
export function getNode() {
    return request({
        url: 'node/index',
    })
}

export function delNode(param) {
    return request({
        url: 'node/nodeDel',
        method: 'post',
        data: param,
    })
}

export function editNode(param) {
    return request({
        url: 'node/nodeEdit',
        method: 'post',
        data: param,
    })
}

export function addNode(param) {
    return request({
        url: 'node/nodeAdd',
        method: 'post',
        data: param,
    })
}
import request from "@/utils/request"

export function getTotal(params) {
    return request({
        url: "order/index",
        method: "get",
        params
    })
}

export function getOrderDetail(params) {
    return request({
        url: "order/getOrderDetail",
        method: "get",
        params
    })
}

export function sendGoods(data) {
    return request({
        url: "order/sendGoods",
        method: "post",
        data
    })
}

export function selfPickedUp(data) {
    return request({
        url: "order/selfPickedUp",
        method: "post",
        data
    })
}


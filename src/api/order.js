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

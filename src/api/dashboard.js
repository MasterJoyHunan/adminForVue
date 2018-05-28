import request from "@/utils/request"
export function memberCharts() {
    return request({
        url: "index/member"
    })
}

export function salesCharts() {
    return request({
        url: "index/sales"
    })
}

export function sysInfo() {
    return request({
        url: "index/systemCount"
    })
}

export function orderInfo() {
    return request({
        url: "index/orderInfo"
    })
}

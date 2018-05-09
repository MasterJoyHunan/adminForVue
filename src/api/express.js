import request from "@/utils/request"

export function getTotal(params) {
    return request({
        url: "express/index",
        method: "get",
        params
    })
}
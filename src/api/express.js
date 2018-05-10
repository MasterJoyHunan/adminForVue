import request from "@/utils/request"

export function getTotal(params) {
    return request({
        url: "express/index",
        method: "get",
        params
    })
}

export function addExpress(data) {
    return request({
        url: "express/addExpress",
        method: "post",
        data
    })
}

export function editExpress(data) {
    return request({
        url: "express/editExpress",
        method: "post",
        data
    })
}

export function delExpress(data) {
    return request({
        url: "express/delExpress",
        method: "post",
        data
    })
}
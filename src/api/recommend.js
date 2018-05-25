import request from "@/utils/request"

export function getRecommendList() {
    return request({
        url: "Recommend/index"
    })
}

export function addRecommendList(params) {
    return request({
        url: "Recommend/addRecommendList",
        method: "post",
        data: params
    })
}

export function editRecommendList(params) {
    return request({
        url: "Recommend/editRecommendList",
        method: "post",
        data: params
    })
}

export function delRecommendList(params) {
    return request({
        url: "Recommend/delRecommendList",
        method: "post",
        data: params
    })
}

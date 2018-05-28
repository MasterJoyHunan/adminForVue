import request from "@/utils/request"

// 推荐位相关
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

// 推荐位内容相关
export function recommendContent(params) {
    return request({
        url: "Recommend/content",
        method: "get",
        params
    })
}

export function addRecommendContent(params) {
    return request({
        url: "Recommend/addRecommendContent",
        method: "post",
        data: params
    })
}

export function editRecommendContent(params) {
    return request({
        url: "Recommend/editRecommendContent",
        method: "post",
        data: params
    })
}

export function delRecommendContent(params) {
    return request({
        url: "Recommend/delRecommendContent",
        method: "post",
        data: params
    })
}

import request from "@/utils/request"
export function getList(params) {
    return request({
        url: "member/index",
        method: "get",
        params
    })
}

export function changeStatus(data) {
    return request({
        url: "member/changeStatus",
        method: "post",
        data
    })
}

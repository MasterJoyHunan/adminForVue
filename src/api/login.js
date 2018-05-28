import request from "@/utils/request"

export function login(user_name, password) {
    return request({
        url: "/login/dologin",
        method: "post",
        data: {
            user_name,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: "/index/user",
        method: "get"
    })
}

export function logout() {
    return request({
        url: "/login/logout",
        method: "post"
    })
}

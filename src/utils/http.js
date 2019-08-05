import Loading from './loading'
import { json2Form } from "@/utils/index";

const gloading = new Loading({
    sync: true
})
function request(options) {
    return new Promise((resolve, reject) => {
        // 遮罩，默认不显示loading
        if (options.mask) {
            // loading
            gloading.start();
        }
        const headers = (options.header = options.header || {});
        let url = options.url;
        url = APPAPI_URL + url + "?Token=" + wx.getStorageSync('token');
        let data = options.data || {};
        wx.request({
            url: url,
            data: data,
            header: headers,
            method: options.method || "POST",
            success: (res) => {
                if (options.mask) {
                    gloading.stop()
                }
                if (res.statusCode === 200 && res.data.Code == 0) {
                    resolve(res.data.Data)
                } else {
                    switch (res.data.Code) {
                        case 401:
                            // token失效
                            login(options);
                            break;
                        default:
                            toast(res.data.Code);
                    }
                    reject(res)
                }
            },
            fail: (res) => {
                reject(res)
            },
            complete: (res) => {
                if (options.mask) {
                    gloading.stop()
                }
            }
        })
    })
}

request.all = (arr) => {
    return Promise.all(arr.map(n => request(n)))
}

function login(options) {
    wx.login({
        success(res) {
            if (res.code) {
                // 这里可以把code传给后台，后台用此获取openid及session_key
                request({
                    url: "/user/login",
                    mask: true,
                    data: {
                        Code: res.code
                    }
                }).then(res2 => {
                    if (res2.Token) {
                        wx.setStorageSync('token', res2.Token);
                        request(options);
                    }
                });
            }
        }
    });
}

function toast(code) {
    let msg = "";
    switch (code) {
        case 400:
            // 参数错误
            msg = "稍等，工程师在赶来的路上了";
            break;
        case 403:
            // 权限不足
            msg = "充点钱就给你这个权限";
            break;
        case 404:
            msg = "啊哦，有什么东西失踪了";
            break;
        case 409:
            // 菜谱名称重复
            msg = "这个菜谱已经存在啦，换一个吧";
            break;
        case 500:
            msg = "服务器不行了，工程师正在抢救";
            break;
        default:
            msg = "出现了未知错误，您先去别处玩会，等会再来";
            break;
    }
    wx.showToast({
        icon: 'none',
        mask: true,
        title: msg,
        duration: 3000
    });
}

export default request;
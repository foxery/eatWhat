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
        url = APPAPI_URL + url;
        let data = options.data || {};
        data.Token = wx.getStorageSync('token');
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
                        case 403:
                            // token失效
                            login(options);
                            break
                        default:
                            let message = res.data.Message || "";
                            wx.showToast({
                                icon: 'none',
                                mask: true,
                                title: message,
                                duration: 3000
                            })
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

export default request;
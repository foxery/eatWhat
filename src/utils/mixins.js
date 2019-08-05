import request from "@/utils/http";
export const uploadMixin = {
    data() {
        return {
            // maxImg: 1,
            //选定照片的本地文件路径列表
            files: [],
            upImg: [],
        }
    },
    onUnload() {
        this.files = [];
        this.upImg = [];
    },
    methods: {
        chooseImage(e) {
            let i = 0; // 多图上传时使用到的index
            let me = this;
            let max = me.maxImg; //最大选择数
            let upLength; //图片数组长度
            let imgFilePaths; //图片的本地临时文件路径列表
            wx.chooseImage({
                count: max || 1, //一次最多可以选择的图片张数
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let len = me.files.concat(res.tempFilePaths);
                    imgFilePaths = res.tempFilePaths;
                    upLength = imgFilePaths.length;
                    if (len.length > max) {
                        wx.showToast({
                            title: "图片最多只能选择" + max + "张",
                            icon: "none",
                            duration: 2000
                        });
                        return false;
                    }
                    /**
                     * 上传完成后把文件上传到服务器
                     */
                    me.upLoad(imgFilePaths, i, upLength); //上传操作
                },
                fail: function () { },
                complete: function () { }
            });
        },
        upLoad(imgPath, i, upLength) {
            let me = this;
            wx.showLoading({
                title: "上传中..."
            });
            //上传文件
            wx.uploadFile({
                url: APPAPI_URL + "/file" + "?Token=" + wx.getStorageSync('token'),
                filePath: imgPath[i],
                name: "File",
                success: function (res) {
                    let response = JSON.parse(res.data);
                    if (response.Code == 0) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        me.files = me.files.concat(imgPath[i]); //合并图片显示数组
                        me.upImg.push(response.Data.FileName);
                        i++;
                        if (i == upLength) {
                            wx.hideLoading(); //上传结束，隐藏loading
                        } else {
                            me.upLoad(imgPath, i, upLength);
                        }
                    } else {
                        switch (response.Code) {
                            case 401:
                                // token失效
                                me.login(imgPath, i, upLength);
                                break;
                            default:
                                me.toast(response.Code);
                        }
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                    wx.showModal({
                        title: "错误提示",
                        content: "上传图片失败",
                        showCancel: false,
                        success: function (res) { }
                    });
                },
                complete: function () {
                }
            });
        },
        deleteImg(index) {
            this.files.splice(index, 1);
            this.upImg.splice(index, 1);
        },
        getUpImg() {
            return this.upImg;
        },
        login(imgPath, i, upLength) {
            let me = this;
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
                                me.upLoad(imgPath, i, upLength);
                            }
                        });
                    }
                }
            });
        },
        toast(code) {
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
    }
}

export default {
    uploadMixin
}
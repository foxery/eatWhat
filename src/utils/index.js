function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 异步请求参数需要格式转化
 * @param {*} json 
 */
export function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

/*获取当前页url的参数*/
export function getCurrentPageUrlOptions() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var options = currentPage.options     //当前页面url
  return options
}

export function wxUpdate() {

  const updateManager = wx.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log(res.hasUpdate);
  });

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    wx.showModal({
      title: '更新提示',
      content: '新版本下载失败',
      showCancel: false
    });
  });
}

export default {
  formatNumber,
  formatTime,
  getCurrentPageUrlOptions,
  json2Form,
  wxUpdate
}

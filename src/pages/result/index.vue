<template>
  <div class="container">
    <div class="wrapper">
      <div
        class="carte-box-wrapper"
        v-if="menuList.length>0"
      >
        <carte-box
          v-for="(item,index) in menuList"
          :key="item.ID"
          :info="item"
          :type="2"
          ref="menu"
          @deleteMenu="deleteMenu(index)"
        ></carte-box>
      </div>
      <image
        src="/static/images/empty.png"
        alt=""
        mode="widthFix"
        class="empty-img"
        v-else
      ></image>
    </div>
    <button
      class="default-size-btn primary-btn block-btn all-btn-position"
      @click="allToMenu"
      v-if="menuList.length>0"
    >全部加入今日菜单</button>
  </div>
</template>

<script>
import carte from "@/components/box";
import { getCurrentPageUrlOptions } from "@/utils/index";
import request from "@/utils/http";

export default {
  data() {
    return {
      menuList: [],
      keyword: "",
      randomInfo: null,
      curPage: 0,
      totalPage: 1
    };
  },
  components: {
    "carte-box": carte
  },
  mounted() {
    let temp = getCurrentPageUrlOptions();
    this.keyword = temp.kw || "";
    if (temp.random) {
      // 从首页的随机按钮过来
      this.randomInfo = temp.random;
      this.getRandomMenuList();
    } else {
      // 从搜索过来
      this.getMenuList();
    }
  },
  onReachBottom() {
    // 滚动至底部加载
    this.curPage++;
    if (this.curPage < this.totalPage && !this.randomInfo) {
      this.getMenuList();
    }
  },
  methods: {
    getMenuList() {
      request({
        url: "/menu/list",
        method: "GET",
        data: {
          Page: this.curPage,
          Category: 0,
          Keyword: this.keyword
        }
      }).then(res => {
        this.totalPage = Math.ceil(res.Total / res.Pagesize);
        this.menuList.push(...res.Data);
      });
    },
    getRandomMenuList() {
      request({
        url: "/menu/random",
        method: "GET",
        data: {
          Info: this.randomInfo
        }
      }).then(res => {
        this.menuList = res;
      });
    },
    deleteMenu(index) {
      this.menuList.splice(index, 1);
    },
    allToMenu() {
      let ids = [];
      this.menuList.forEach(val => {
        ids.push(val.ID);
      });
      request({
        url: "/today/menu",
        mask: true,
        data: {
          MenuID: ids
        },
        method: "PUT"
      }).then(() => {
        wx.showToast({
          icon: "none",
          title: "成功添加到今日菜单",
          duration: 2000
        });
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/menu/main"
          });
        }, 2000);
      });
    }
  }
};
</script>


<style scoped lang="scss">
@import "../../sass/variable.scss";
@import "../../sass/function.scss";
@import "../../sass/animate.scss";

.container {
  min-height: 100vh;
  padding-bottom: rpx(80);
}
.wrapper {
  padding: rpx(15) rpx(30);
}
.carte-box-wrapper {
  margin-top: rpx(10);
}
.all-btn-position {
  position: fixed;
  bottom: 0;
  z-index: 10;
  border-radius: 0;
  height: rpx(50);
  line-height: rpx(50);
}
</style>

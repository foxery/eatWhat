<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">今日菜单</div>
      <div class="relative">
        <div class="banner-wrapper">
          <image
            src="/static/images/menu_banner.jpg"
            alt=""
            mode="widthFix"
          ></image>
        </div>
        <button
          class="primary-btn default-size-btn pill random-btn animated tada"
          @click="clearMenu"
        >清空全部菜单</button>
        <div class="list-wrapper">
          <carte-box
            v-for="item in menuList"
            :key="item.ID"
            :info="item"
            :type="2"
            ref="menu"
            @deleteMenu="deleteMenu(item.ID)"
          ></carte-box>
        </div>
      </div>
    </div>
    <bottom-bar :active="'menu'"></bottom-bar>
  </div>
</template>

<script>
import bottomBar from "@/components/bottomBar";
import carte from "@/components/box";
import request from "@/utils/http";

export default {
  data() {
    return {
      menuList: []
    };
  },
  components: {
    "bottom-bar": bottomBar,
    "carte-box": carte
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      request({
        url: "/today/menu",
        method: "GET"
      }).then(res => {
        this.menuList = res;
      });
    },
    deleteMenu(id) {
      request({
        url: "/today/menu/remove",
        method: "PUT",
        data: {
          MenuID: [id]
        }
      }).then(() => {
        this.getMenuList();
      });
    },
    clearMenu() {
      let ids = [];
      this.menuList.forEach(val => {
        ids.push(val.ID);
      });
      request({
        url: "/today/menu/remove",
        method: "PUT",
        data: {
          MenuID: ids
        }
      }).then(() => {
        wx.showToast({
          icon: "none",
          title: "成功清除所有今日菜单",
          duration: 2000
        });
        this.getMenuList();
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
.title {
  font-size: rpx(20);
  font-weight: bold;
  margin-bottom: rpx(15);
  color: #686868;
}
.wrapper {
  padding: rpx(15) rpx(30);
}
.banner-wrapper {
  border-radius: rpx(15);
  overflow: hidden;
  margin-top: rpx(15);
}
.random-btn {
  position: absolute;
  top: rpx(20);
  right: rpx(20);
}
.list-wrapper {
  position: absolute;
  top: rpx(150);
  left: rpx(10);
  right: rpx(10);
  padding-bottom: rpx(100);
}
</style>

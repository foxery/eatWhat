<template>
  <div class="container">
    <div class="wrapper">
      <div class="carte-box-wrapper">
        <carte-box
          v-for="(item,index) in menuList"
          :key="item.ID"
          :info="item"
          :type="2"
          ref="menu"
          @deleteMenu="deleteMenu(index)"
        ></carte-box>
      </div>
    </div>
    <button class="default-size-btn primary-btn block-btn all-btn-position">全部加入今日菜单</button>
  </div>
</template>

<script>
import carte from "@/components/box";
import { json2Form, getCurrentPageUrlOptions } from "@/utils/index";
import request from "@/utils/http";

export default {
  data() {
    return {
      menuList: [],
      keyword: "",
      randomInfo: null
    };
  },
  components: {
    "carte-box": carte
  },
  mounted() {
    let temp = getCurrentPageUrlOptions();
    this.keyword = temp.kw || "";
    console.log(temp);
    if (temp.random) {
      // 从首页的随机按钮过来
      this.randomInfo = temp.random;
      this.getRandomMenuList();
    } else {
      // 从搜索过来
      this.getMenuList();
    }
  },
  methods: {
    getMenuList() {
      request({
        url: "/menu/list",
        method: "GET",
        data: {
          Page: 0,
          Category: 0,
          Keyword: this.keyword
        }
      }).then(res => {
        this.menuList = res;
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

<template>
  <div class="container">
    <div class="wrapper">
      <ul class="tab-list clear">
        <li
          v-for="item in categoryArr"
          :key="item.type"
          :class="{active:item.type==categoryType}"
          @click="selectCategory(item.type)"
        >
          <div class="inner">{{item.name}}</div>
        </li>
      </ul>
      <div
        class="carte-box-wrapper"
        v-for="item in menuList"
        :key="item.ID"
      >
        <carte-box
          :info="item"
          :type="2"
        ></carte-box>
      </div>
      <image
        src="/static/images/empty.png"
        alt=""
        mode="widthFix"
        class="empty-img"
        v-if="menuList.length==0"
      ></image>
    </div>
  </div>
</template>

<script>
import carte from "@/components/box";
import store from "@/utils/store";
import request from "@/utils/http";

export default {
  data() {
    return {
      //1-荤菜  2-素菜 3-半荤 4-汤
      categoryType: 0,
      menuList: []
    };
  },
  computed: {
    categoryArr() {
      return store.state.category;
    }
  },
  components: {
    "carte-box": carte
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    selectCategory(type) {
      this.categoryType = type;
      this.getMenuList();
    },
    getMenuList() {
      request({
        url: "/menu/list",
        method: "GET",
        data: {
          Page: 0,
          Category: this.categoryType,
          Keyword: ""
        }
      }).then(res => {
        this.menuList = res;
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
  box-sizing:border-box;
}
.wrapper {
  padding: rpx(15) rpx(30);
}
.tab-list {
  margin: 0 rpx(-4);
  > li {
    float: left;
    width: calcwidth(4);
    font-size: rpx(14);
    color: darken($primary-light-color, 30%);
    padding: 0 rpx(4);
    box-sizing: border-box;
    .inner {
      box-sizing: border-box;
      border-radius: rpx(4);
      border: rpx(1) solid $primary-light-color;
      width: 100%;
      height: rpx(30);
      line-height: rpx(30);
      text-align: center;
    }
    &.active {
      position: relative;
      top: rpx(-2);
      .inner {
        @include gradient($primary-color, $second-color);
        box-shadow: rpx(1) rpx(1) rpx(8) rpx(1) rgba($primary-color, 0.3);
        color: #333;
        border: none;
        height: rpx(34);
        line-height: rpx(34);
      }
    }
  }
}
.carte-box-wrapper {
  margin-top: rpx(10);
}
</style>

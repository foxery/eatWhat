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
      <div class="carte-box-wrapper">
        <carte-box></carte-box>
      </div>
    </div>
  </div>
</template>

<script>
import carte from "@/components/box";

export default {
  data() {
    return {
      //1-荤菜  2-素菜 3-半荤 4-汤
      categoryType: "",
      categoryArr: [
        {
          name: "荤菜",
          type: 1
        },
        {
          name: "素菜",
          type: 2
        },
        {
          name: "半荤",
          type: 3
        },
        {
          name: "汤",
          type: 4
        }
      ]
    };
  },
  components: {
    "carte-box": carte
  },
  methods: {
    selectCategory(type) {
      this.categoryType = type;
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
        color: #fff;
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

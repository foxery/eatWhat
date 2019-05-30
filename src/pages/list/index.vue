<template>
  <div class="container">
    <div class="wrapper">
      <ul class="tab-list clear">
        <li class="active">
          <div class="inner">荤菜</div>
        </li>
        <li>
          <div class="inner">素菜</div>
        </li>
        <li>
          <div class="inner">半荤</div>
        </li>
        <li>
          <div class="inner">汤</div>
        </li>
      </ul>
      <div class="carte-box-wrapper">
        <carte-box></carte-box>
      </div>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import bottomBar from "@/components/bottomBar";
import carte from "@/components/box";

export default {
  data() {
    return {};
  },
  components: {
    "bottom-bar": bottomBar,
    "carte-box": carte
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

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
        <button class="primary-btn default-size-btn pill random-btn animated tada">清空全部菜单</button>
        <div class="list-wrapper">
          <carte-box></carte-box>
        </div>
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
}
</style>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="carte-box-wrapper">
        <carte-box :type="'delete'"></carte-box>
      </div>
    </div>
    <button class="default-size-btn primary-btn block-btn all-btn-position">全部加入今日菜单</button>
  </div>
</template>

<script>
import carte from "@/components/box";

export default {
  data() {
    return {};
  },
  components: {
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

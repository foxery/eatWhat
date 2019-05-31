<template>
  <div
    class="box"
    @click="turnToDetail(0)"
  >
    <div class="menu-banner">
      <image
        src="/static/images/demo.jpg"
        alt=""
        mode="widthFix"
      >
      </image>
    </div>
    <div class="menu-info-wrapper">
      <div>
        <div class="tag primary-light">荤菜</div>
        <div class="menu-info-title">菜谱名称</div>
      </div>
      <div class="menu-info-text">所需食材</div>
    </div>
    <div class="add-wrapper">
      <div class="add-box">
        <template v-if="type=='add'">+</template>
        <template v-else>-</template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //add-添加  delete-移除
    type: {
      type: String,
      default: "add"
    }
  },
  methods: {
    turnToDetail(id) {
      wx.navigateTo({
        url: "/pages/detail/main?id=" + id
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../sass/variable.scss";
@import "../sass/function.scss";

.box {
  border-radius: rpx(8);
  box-shadow: 0 0 rpx(5) 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.menu-banner {
  width: 100%;
  height: rpx(200);
  border-radius: rpx(6);
  overflow: hidden;
}
.menu-info-wrapper {
  padding: rpx(20);
}
.menu-info-title {
  font-size: rpx(16);
  font-weight: bold;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  margin-left: rpx(5);
}
.menu-info-text {
  font-size: rpx(14);
  color: #494c4e;
  margin-top: rpx(20);
}
.add-wrapper {
  position: absolute;
  right: rpx(20);
  top: rpx(20);
  z-index: 10;
  width: rpx(40);
  height: rpx(40);
  background-color: rgba($primary-color, 0.5);
  border-radius: 50%;
  padding: rpx(7);
}
.add-box {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: $primary-color;
  text-align: center;
  line-height: rpx(36);
  font-size: rpx(30);
  color: darken($primary-color, 20%);
}
</style>

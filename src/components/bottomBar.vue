<template>
  <div class="tab-bar">
    <ul class="tab-list clear">
      <li @click="changeActive('index')">
        <image
          src="/static/images/icn_index_active.png"
          alt=""
          mode="widthFix"
          class="animated bounce"
          v-if="active=='index'"
        ></image>
        <image
          src="/static/images/icn_index.png"
          alt=""
          mode="widthFix"
          v-else
        ></image>
      </li>
      <li @click="changeActive('food')" :class="{'animated bounce':active=='food'}">
        <div class="middle-box" :class="{'active':active=='food'}">
          <image
            src="/static/images/icn_food.png"
            alt=""
            mode="widthFix"
          >
          </image>
        </div>
      </li>
      <li @click="changeActive('menu')">
        <image
          src="/static/images/icn_menu_active.png"
          alt=""
          mode="widthFix"
          class="animated bounce"
          v-if="active=='menu'"
        >
        </image>
        <image
          src="/static/images/icn_menu.png"
          alt=""
          mode="widthFix"
          v-else
        >
        </image>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      //index-首页  food-食材 menu-菜单
      active: "index"
    };
  },
  methods: {
    changeActive(active) {
      this.active = active;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/variable.scss";
@import "../sass/function.scss";
@import "../sass/animate.scss";

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index-level-1;
  border-top: rpx(1) solid $second-light-color;
  background-color: #fff;
}
.tab-list {
  > li {
    width: calcwidth(3);
    float: left;
    display: block;
    text-align: center;
    font-size: rpx(12);
    padding: rpx(15) 0;
    position: relative;
    image {
      width: rpx(25);
      height: rpx(25);
      display: block;
      margin: auto;
    }
    .middle-box {
      border-radius: rpx(4);
      width: rpx(50);
      height: rpx(50);
      background-color: $second-light-color;
      display: block;
      position: absolute;
      top: rpx(-25);
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      &.active {
        background-color: $second-color;
      }
      image {
        width: rpx(30);
        height: rpx(30);
        margin-top: rpx(10);
      }
    }
  }
}
.transition-top {
  transition: transform 0.3s ease-in-out;
  transform: translateY();
}
</style>

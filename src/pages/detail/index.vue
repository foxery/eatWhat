<template>
  <div class="container">
    <div class="list-suspension-wrapper">
      <div
        class="list-btn"
        @click="toggleIngredientsBox"
      >
        <image
          src="/static/images/icn_list.png"
          alt=""
          mode="widthFix"
        ></image>
      </div>
      <ul
        class="list-suspension-list animated"
        :class="[{zoomIn:!animatedIn},{zoomOut:animatedIn}]"
        v-show="showIngredientsBox"
      >
        <li class="clear">
          <div class="left">食材</div>
          <div class="right">数量</div>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="banner-wrapper">
        <image
          src="/static/images/demo.jpg"
          alt=""
          mode="widthFix"
        ></image>
      </div>
      <div class="detail-title-wrapper">
        <div class="tag primary-light">荤菜</div>
        <div class="menu-info-title">菜谱名称</div>
      </div>
      <div class="detail-subtitle title-primary">食材</div>
      <ul class="detail-ingredient-list">
        <li class="clear">
          <div class="left">食材</div>
          <div class="right">数量</div>
        </li>
        <li class="clear">
          <div class="left">食材</div>
          <div class="right">数量</div>
        </li>
        <li class="clear">
          <div class="left">食材</div>
          <div class="right">数量</div>
        </li>
      </ul>
      <div class="detail-subtitle title-primary">做法</div>
      <div>
        <div class="do-title"></div>
        <div class="do-content">
          <div>皮卡丘皮卡丘屏情况去取票去看看前几年今年初积极参加搜索框里PSP清扫口时空可行性没开吗小客车能看出你</div>
          <image
            src="/static/images/demo.jpg"
            alt=""
            mode="widthFix"
          ></image>
        </div>
      </div>
      <div class="do-box">
        <div class="do-title"></div>
        <div class="do-content">
          <div>皮卡丘皮卡丘屏情况去取票去看看前几年今年初积极参加搜索框里PSP清扫口时空可行性没开吗小客车能看出你</div>
          <image
            src="/static/images/demo.jpg"
            alt=""
            mode="widthFix"
          ></image>
        </div>
      </div>
      <div class="detail-subtitle title-primary">温馨提示</div>
      <div class="do-content">爸爸啦啦啦啦啦</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIngredientsBox: false,
      animatedIn: true
    };
  },
  components: {},
  methods: {
    toggleIngredientsBox() {
      if (this.animatedIn) {
        this.showIngredientsBox = !this.showIngredientsBox;
        this.animatedIn = false;
      } else {
        this.animatedIn = true;
        // 配合动画效果
        setTimeout(() => {
          this.showIngredientsBox = !this.showIngredientsBox;
        }, 1000);
      }
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
  padding-bottom: rpx(30);
}
.wrapper {
  padding: rpx(15) rpx(30);
}
.banner-wrapper {
  border-radius: rpx(15);
  overflow: hidden;
}
.menu-info-title {
  font-size: rpx(16);
  font-weight: bold;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  margin-left: rpx(5);
}
.detail-title-wrapper {
  margin-top: rpx(10);
}
.detail-ingredient-list {
  font-size: rpx(14);
  color: darken($primary-light-color, 40%);
  > li {
    padding: rpx(5);
    border-radius: rpx(2);
    line-height: normal;
    &:nth-child(2n) {
      background-color: lighten($primary-light-color, 20%);
    }
    &:nth-child(2n + 1) {
      background-color: #fff;
    }
    &:first-child {
      padding: rpx(10) rpx(5);
      font-size: rpx(16);
      font-weight: 500;
    }
  }
}
.detail-subtitle {
  padding: 0 rpx(5);
  margin-top: rpx(20);
  margin-bottom: rpx(20);
}
.do-title {
  float: left;
  width: rpx(10);
  height: rpx(10);
  border-radius: 50%;
  background-color: $second-color;
  margin-right: rpx(10);
  margin-top: rpx(5);
}
.do-content {
  overflow: hidden;
  font-size: rpx(14);
  image {
    margin-top: rpx(5);
  }
}
.do-box {
  margin-top: rpx(10);
}
.list-suspension-wrapper {
  position: fixed;
  right: rpx(30);
  bottom: rpx(30);
  z-index: 10;
}
.list-btn {
  border-radius: 50%;
  width: rpx(35);
  height: rpx(35);
  text-align: center;
  box-shadow: 0 0 rpx(5) 0 rgba($primary-color, 0.1);
  @include gradient($primary-color, $second-color, to right, 50%);
  image {
    width: 80%;
    margin-top: rpx(3);
  }
}
.list-suspension-list {
  border-radius: rpx(8);
  background-color: #151722;
  color: #fff;
  font-size: rpx(14);
  padding: rpx(10);
  position: absolute;
  right: 0;
  bottom: rpx(45);
  min-width: rpx(150);
  > li {
    white-space: nowrap;
  }
}
</style>

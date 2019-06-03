<template>
  <div class="container">
    <div class="wrapper">
      <edit-bar
        :icn="icn"
        :placeholder="'请输入你的菜谱名称...'"
        :btnType="'done'"
      ></edit-bar>
      <div class="relative">
        <div class="banner-wrapper">
          <image
            src="/static/images/upload_bg.jpg"
            alt=""
            mode="widthFix"
          >
          </image>
        </div>
        <div class="create-btn-wrapper">
          <div class="create-btn-box">
            <image
              src="/static/images/icn_add.png"
              alt=""
              mode="widthFix"
            >
            </image>
            添加菜谱封面
          </div>
        </div>
      </div>
      <div class="title-primary">所选分类</div>
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
      <div class="title-primary">所需食材</div>
      <ul class="ingredient-list">
        <li class="clear">
          <image
            src="/static/images/icn_delete.png"
            alt=""
            mode="widthFix"
            class="delete-icn"
          >
          </image>
          <div class="i-block-middle clear">
            <div class="left"><input
                type="text"
                class="ingredient-name-input"
                placeholder="请输入食材..."
              ></div>
            <div class="ingredient-amount right"><input
                type="text"
                class="ingredient-amount-input"
                placeholder="请输入用量..."
              ></div>
          </div>
        </li>
      </ul>
      <button class="add-row-btn">+ 添加一行</button>
      <div class="title-primary">做菜步骤</div>
      <div class="step-wrapper">
        <div>步骤1</div>
        <textarea
          placeholder="请输入步骤详情"
          class="step-textarea"
          auto-height="true"
        ></textarea>
        <div class="clear upload-box-wrapper">
          <div class="upload-box">
            <image
              src="/static/images/icn_add.png"
              alt=""
              mode="widthFix"
            >
            </image>
          </div>
          <div class="upload-box">
            <image
              src="/static/images/icn_add.png"
              alt=""
              mode="widthFix"
              class="add-image-icn"
            >
            </image>
          </div>
        </div>
      </div>
      <button class="add-row-btn">+ 添加下一步骤</button>
      <div class="title-primary">温馨提示</div>
      <textarea
        placeholder="你还有什么要说的吗"
        class="remark-textarea"
        auto-height="true"
      ></textarea>
    </div>
    <button class="default-size-btn primary-btn block-btn all-btn-position">创建菜谱</button>
  </div>
</template>

<script>
import editBar from "@/components/search";

export default {
  data() {
    return {
      icn: "/static/images/icn_edit.png"
    };
  },
  components: {
    "edit-bar": editBar
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
.banner-wrapper {
  border-radius: rpx(15);
  overflow: hidden;
  margin-top: rpx(15);
}
.create-btn-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
}
.create-btn-box {
  border-radius: rpx(4);
  background-color: rgba(255, 255, 255, 0.8);
  color: #4b566a;
  font-size: rpx(14);
  padding: rpx(20);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image {
    width: rpx(15);
    margin-right: rpx(5);
    vertical-align: middle;
    display: inline-block;
  }
}
.ingredient-list {
  > li {
    border-radius: rpx(4);
    box-shadow: 0 0 rpx(5) 0 rgba($primary-color, 0.1);
    font-size: rpx(14);
    padding: rpx(10) rpx(20);
    background-color: #fff;
    position: relative;
    margin-top: rpx(15);
  }
}
.delete-icn {
  display: inline-block;
  vertical-align: middle;
  width: rpx(15);
  margin-right: rpx(15);
}
.ingredient-amount {
  color: #b5b5b5;
  font-size: rpx(12);
}
.i-block-middle {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 60rpx);
}
.ingredient-name-input {
  width: rpx(150);
}
.ingredient-amount-input {
  width: rpx(70);
}
.add-row-btn {
  color: $primary-color;
  font-size: rpx(14);
  background-color: transparent;
  text-align: left;
  padding: 0;
  padding-left: rpx(20);
  margin-top: rpx(10);
}
.step-wrapper {
  padding: rpx(15);
  border-radius: rpx(2);
  background-color: #f4f2f2;
  margin-top: rpx(15);
  color: #868585;
  font-size: rpx(14);
  font-weight: bold;
}
.step-textarea {
  height: rpx(25);
  color: #868585;
  margin-top: rpx(10);
  font-weight: normal;
}
.upload-box-wrapper {
  margin-left: rpx(-10);
}
.upload-box {
  border: rpx(1) solid #d6d4d4;
  border-radius: rpx(4);
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  position: relative;
  text-align: center;
  float: left;
  margin-left: rpx(10);
  margin-top: rpx(10);
  image {
    position: absolute;
    z-index: 1;
    width: 100%;
    left: 0;
    top: 0;
  }
  .add-image-icn {
    top: 20%;
    left: 20%;
    width: 60%;
  }
}
.remark-textarea {
  height: rpx(25);
  color: #868585;
  font-size: rpx(14);
  border-bottom: rpx(1) solid #d6d4d4;
  padding: rpx(10) 0;
}
.all-btn-position {
  position: fixed;
  bottom: 0;
  z-index: 10;
  border-radius: 0;
  height: rpx(50);
  line-height: rpx(50);
}
.tab-list {
  margin: 0 rpx(-4);
  margin-top: rpx(10);
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
</style>

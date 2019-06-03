<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">今天吃什么？</div>
      <search-bar></search-bar>
      <div class="relative">
        <div class="banner-wrapper">
          <image
            src="/static/images/banner.jpg"
            alt=""
            mode="widthFix"
          ></image>
        </div>
        <button
          class="primary-btn default-size-btn pill random-btn animated tada"
          @click="randomClick()"
        >随机</button>
        <div class="random-wrapper">
          <ul class="random-categery-list clear">
            <li class="active">
              <div class="random-categery-wrapper">
                <div class="change-amount-wrapper">
                  <div class="amount-box">+</div>
                  <div class="amount-box decrease">-</div>
                </div>
                <div class="icn-wrapper">
                  <image
                    src="/static/images/category_icn_meat.png"
                    alt=""
                    mode="widthFix"
                  ></image>
                </div>
                <div>荤菜</div>
                <div class="line"></div>
                <div class="amount">1</div>
              </div>
            </li>
            <li>
              <div class="random-categery-wrapper">
                <div class="icn-wrapper">
                  <image
                    src="/static/images/category_icn_vegetables.png"
                    alt=""
                    mode="widthFix"
                  ></image>
                </div>
                <div>素菜</div>
                <div class="line"></div>
                <div class="amount">1</div>
              </div>
            </li>
            <li>
              <div class="random-categery-wrapper">
                <div class="icn-wrapper">
                  <image
                    src="/static/images/category_icn_hulfmeat.png"
                    alt=""
                    mode="widthFix"
                  ></image>
                </div>
                <div>半荤</div>
                <div class="line"></div>
                <div class="amount">1</div>
              </div>
            </li>
            <li>
              <div class="random-categery-wrapper">
                <div class="icn-wrapper">
                  <image
                    src="/static/images/category_icn_soup.png"
                    alt=""
                    mode="widthFix"
                  ></image>
                </div>
                <div>汤</div>
                <div class="line"></div>
                <div class="amount">1</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="carte-wrapper">
        <navigator
          class="more-link"
          url="/pages/list/main"
          hover-class="none"
        >查看全部 ></navigator>
        <carte-box></carte-box>
        <navigator
          class="create-btn"
          url="/pages/create/main"
          hover-class="none"
        >+ 创建菜谱</navigator>
      </div>
    </div>
    <bottom-bar :active="'index'"></bottom-bar>
  </div>
</template>

<script>
import bottomBar from "@/components/bottomBar";
import search from "@/components/search";
import carte from "@/components/box";

export default {
  data() {
    return {};
  },

  components: {
    "bottom-bar": bottomBar,
    "search-bar": search,
    "carte-box": carte
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },
    randomClick() {
      wx.navigateTo({
        url: "/pages/result/main"
      });
    }
  },

  created() {
    // let app = getApp()
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
.random-wrapper {
  border-radius: rpx(15);
  background-color: #fff;
  padding: rpx(15) rpx(20);
  box-shadow: 0 rpx(3) rpx(6) 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: rpx(-70);
  left: rpx(10);
  right: rpx(10);
}
.random-categery-list {
  > li {
    background-color: #fff;
    padding: rpx(5);
    font-size: rpx(14);
    width: calcwidth(4);
    float: left;
    box-sizing: border-box;
    .random-categery-wrapper {
      transition: all 0.3s ease-in-out;
      border: rpx(1) solid #f6f5f4;
      border-radius: rpx(200);
      padding: rpx(5);
      text-align: center;
      font-weight: 500;
      position: relative;
      .icn-wrapper {
        background-color: #fff;
        border-radius: 50%;
        border: rpx(1) solid #f6f5f4;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
        margin-bottom: rpx(10);
        image {
          position: absolute;
          width: 50%;
          top: 25%;
          left: 25%;
        }
      }
    }
    .line {
      width: rpx(1);
      height: rpx(10);
      background-color: #e4e4e4;
      display: block;
      margin: auto;
      margin-bottom: rpx(5);
      margin-top: rpx(5);
    }
    .amount {
      font-size: rpx(12);
    }
    &.active {
      .random-categery-wrapper {
        background-color: $primary-color;
        border-color: $primary-color;
      }
    }
  }
}
.random-btn {
  position: absolute;
  top: rpx(20);
  right: rpx(20);
}
.change-amount-wrapper {
  position: absolute;
  top: rpx(-20);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  .amount-box {
    width: rpx(30);
    height: rpx(30);
    font-size: rpx(18);
    border-radius: rpx(2);
    background-color: $primary-light-color;
    box-shadow: 0 rpx(3) rpx(5) 0 rgba(0, 0, 0, 0.1);
    &.decrease {
      background-color: $second-light-color;
    }
  }
}
.carte-wrapper {
  margin-top: rpx(100);
}
.more-link {
  font-size: rpx(12);
  color: $primary-color;
  text-align: right;
  margin-bottom: rpx(10);
  &:active {
    background-color: transparent;
  }
}
.create-btn {
  font-size: rpx(14);
  color: #AAA09F;
  box-sizing: border-box;
  border-radius: rpx(4);
  border: rpx(1) solid #DED4D2;
  width: 100%;
  height: rpx(35);
  line-height: rpx(35);
  text-align: center;
  margin-top: rpx(30);
}
</style>

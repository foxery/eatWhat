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
        <li
          class="clear"
          v-for="item in detailData.Ingredients"
          :key="item.ID"
        >
          <div class="left">{{item.Name}}</div>
          <div class="right">
            <span>{{item.Number}}</span>
            <span>{{item.Unit}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="relative">
      <image
        :src="IMAGE_URL+detailData.Cover"
        alt=""
        mode="aspectFill"
        class="cover-img"
      ></image>
      <div class="wrapper">
        <div class="detail-title-wrapper">
          <div class="tag primary-light">{{curCategoryName}}</div>
          <div class="menu-info-title">{{detailData.Name}}</div>
        </div>
        <div class="detail-subtitle title-primary">食材</div>
        <ul class="detail-ingredient-list">
          <li
            class="clear"
            v-for="item in detailData.Ingredients"
            :key="item.ID"
          >
            <div class="left">{{item.Name}}</div>
            <div class="right">
              <span>{{item.Number}}</span>
              <span>{{item.Unit}}</span>
            </div>
          </li>
        </ul>
        <div class="detail-subtitle title-primary">做法</div>
        <div
          class="do-box"
          v-for="item in detailData.Step"
          :key="item.ID"
        >
          <div class="do-title"></div>
          <div class="do-content">
            <div>{{item.Detail}}</div>
            <image
              :src="IMAGE_URL+sub"
              alt=""
              mode="widthFix"
              v-for="(sub,i) in item.Imgs"
              :key="sub+i"
            ></image>
          </div>
        </div>
        <div class="detail-subtitle title-primary">温馨提示</div>
        <div class="do-content">{{detailData.Remark}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/http";
import { getCurrentPageUrlOptions } from "@/utils/index";
import store from "@/utils/store";

export default {
  data() {
    return {
      IMAGE_URL: IMAGE_URL + "/",
      showIngredientsBox: false,
      animatedIn: true,
      curCategoryName: "",
      detailData: {
        Name: "",
        Ingredients: [],
        Step: [],
        Remark: ""
      }
    };
  },
  computed: {
    categoryArr() {
      return store.state.category;
    }
  },
  mounted() {
    this.getDetail();
  },
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
    },
    getDetail() {
      request({
        url: "/menu/info",
        mask: true,
        data: {
          ID: getCurrentPageUrlOptions().id
        },
        method: "GET"
      }).then(res => {
        this.detailData = res;
        this.categoryArr.forEach(val => {
          if (val.type == res.Category) {
            this.curCategoryName = val.name;
          }
        });
        for (let i = 0; i < this.detailData.Step.length; i++) {
          if (this.detailData.Step[i].Imgs) {
            this.detailData.Step[i].Imgs = this.detailData.Step[i].Imgs.split(
              ","
            );
          } else {
            this.detailData.Step[i].Imgs = [];
          }
        }
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
  padding-bottom: rpx(30);
}
.wrapper {
  padding: rpx(15);
  position: absolute;
  left: rpx(30);
  right: rpx(30);
  z-index: 1;
  top: rpx(220);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: rpx(8);
  box-shadow: 0 0 rpx(5) 0 rgba(0, 0, 0, 0.1);
  margin-bottom: rpx(30);
}
.banner-wrapper {
  border-radius: rpx(15);
  overflow: hidden;
}
.cover-img {
  width: 100%;
  height: rpx(280);
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
    width: 100%;
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

<template>
  <div class="container">
    <div class="wrapper">
      <div class="relative">
        <div class="banner-wrapper">
          <image
            src="/static/images/ingredient_banner.png"
            alt=""
            mode="widthFix"
          ></image>
        </div>
        <div class="list-wrapper">
          <ul class="ingredient-list">
            <li
              class="clear"
              v-for="(item,index) in ingredientsArr"
              :key="item.Name"
              :class="{complete:item.Completed}"
              @click="complete(index)"
            >
              <div class="line-through"></div>
              <div class="click-box"></div>
              <div class="i-block-middle clear">
                <div class="left">{{item.Name}}</div>
                <div class="ingredient-amount right">{{item.Number}}{{item.Unit}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <bottom-bar :active="'ingredients'"></bottom-bar>
  </div>
</template>

<script>
import bottomBar from "@/components/bottomBar";
import request from "@/utils/http";

export default {
  data() {
    return {
      ingredientsArr: []
    };
  },
  components: {
    "bottom-bar": bottomBar
  },
  mounted() {
    this.getIngredientsList();
  },
  methods: {
    complete(index) {
      if (!this.ingredientsArr[index].Completed) {
        this.ingredientsArr[index].Completed = true;
        let temp = this.ingredientsArr[index];
        this.ingredientsArr.splice(index, 1);
        this.ingredientsArr.push(temp);
      }
    },
    getIngredientsList() {
      request({
        url: "/today/food",
        method: "GET",
        mask: true
      }).then(res => {
        this.ingredientsArr = res;
        this.ingredientsArr = this.ingredientsArr.map(val => {
          val.Completed = false;
          return val;
        });
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
  padding-bottom: rpx(80);
}
.wrapper {
  padding: rpx(15) rpx(30);
}
.banner-wrapper {
  border-radius: rpx(15);
  overflow: hidden;
}
.list-wrapper {
  position: absolute;
  top: rpx(200);
  left: rpx(10);
  right: rpx(10);
  padding-bottom: rpx(100);
}
.ingredient-list {
  > li {
    border-radius: rpx(4);
    box-shadow: 0 0 rpx(5) 0 rgba($primary-color, 0.1);
    font-size: rpx(14);
    padding: rpx(10) rpx(20);
    background-color: #fff;
    position: relative;
    + li {
      margin-top: rpx(15);
    }
    .line-through {
      height: rpx(1);
      background-color: $primary-color;
      position: absolute;
      top: 50%;
      left: rpx(20);
      width: 0;
      transition: width 0.3s ease-in-out;
    }
    &.complete {
      opacity: 0.5;
      .click-box {
        background-color: $primary-color;
      }
      .line-through {
        width: 86%;
      }
    }
  }
}
.click-box {
  display: inline-block;
  vertical-align: middle;
  width: rpx(10);
  height: rpx(10);
  border-radius: rpx(4);
  border: rpx(2) solid $primary-color;
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
</style>

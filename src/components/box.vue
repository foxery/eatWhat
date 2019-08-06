<template>
  <div class="box">
    <div @click="turnToDetail(boxInfo.ID)">
      <div class="menu-banner">
        <image
          :src="IMAGE_URL+boxInfo.Cover"
          alt=""
          mode="widthFix"
        >
        </image>
      </div>
      <div class="menu-info-wrapper">
        <div>
          <div class="tag primary-light">{{boxInfo.CategoryName}}</div>
          <div class="menu-info-title">{{boxInfo.Name}}</div>
        </div>
        <div class="menu-info-text">{{boxInfo.ingredientsText}}</div>
      </div>
    </div>
    <div
      class="handle-bar"
      v-if="type>0"
    >
      <image
        src="/static/images/icn_add_sm.png"
        alt=""
        mode="widthFix"
        v-if="type==1"
        @click="addTodayMenu(boxInfo.ID)"
      >
      </image>
      <image
        src="/static/images/icn_delete_sm.png"
        alt=""
        mode="widthFix"
        v-if="type==2"
        @click="deleteMenu"
      >
      </image>
    </div>
  </div>
</template>

<script>
import request from "@/utils/http";
import store from "@/utils/store";

export default {
  props: {
    //1-添加到今日菜单  2-删除
    type: {
      type: String,
      default: 1
    },
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      IMAGE_URL: IMAGE_URL + "/",
      boxInfo: {
        ID: 0,
        CategoryName: "",
        Cover: "",
        Name: "",
        ingredientsText: ""
      }
    };
  },
  computed: {
    category() {
      return store.state.category;
    }
  },
  mounted() {
    if (this.info) {
      this.boxInfo = this.info;
      this.category.forEach(val => {
        if (val.type == this.boxInfo.Category) {
          this.boxInfo.CategoryName = val.name;
        }
      });
      let ingredientsText = "";
      for (let i = 0; i < this.boxInfo.Ingredients.length; i++) {
        ingredientsText +=
          this.boxInfo.Ingredients[i].Name +
          this.boxInfo.Ingredients[i].Number +
          this.boxInfo.Ingredients[i].Unit +
          "、";
      }
      this.boxInfo.ingredientsText = ingredientsText.substr(
        0,
        ingredientsText.length - 1
      );
    }
  },
  methods: {
    turnToDetail(id) {
      wx.navigateTo({
        url: "/pages/detail/main?id=" + id
      });
    },
    addTodayMenu(id) {
      request({
        url: "/today/menu",
        mask: true,
        data: {
          MenuID: [id]
        },
        method: "PUT"
      }).then(() => {
        wx.showToast({
          icon: "none",
          title: "成功添加今日菜单",
          duration: 2000
        });
      });
    },
    deleteMenu() {
      this.$emit("deleteMenu");
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
  + .box {
    margin-top: rpx(10);
  }
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
.handle-bar {
  background-color: #fff;
  position: absolute;
  z-index: 10;
  right: 0;
  top: 0;
  border-radius: rpx(2);
  font-size: 0;
  padding: rpx(5);
  image {
    width: rpx(20);
    height: rpx(20);
    display: inline-block;
    + image {
      margin-left: rpx(10);
    }
  }
}
</style>

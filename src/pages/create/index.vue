<template>
  <div class="container">
    <div class="wrapper">
      <edit-bar
        :icn="icn"
        :placeholder="'请输入你的菜谱名称...'"
        :btnType="'done'"
        ref="name"
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
        <li
          :class="{active:item.type==categoryType}"
          v-for="item in categoryArr"
          :key="item.type"
          @click="selectCategory(item.type)"
        >
          <div class="inner">{{item.name}}</div>
        </li>
      </ul>
      <div class="title-primary">所需食材</div>
      <ul class="ingredient-list">
        <li
          class="clear"
          v-for="(item,index) in ingredientsArr"
          :key="index"
        >
          <image
            src="/static/images/icn_delete.png"
            alt=""
            mode="widthFix"
            class="delete-icn"
            @click="deleteIngredient(index)"
          >
          </image>
          <div class="i-block-middle clear">
            <div class="left"><input
                type="text"
                class="ingredient-name-input"
                placeholder="请输入食材..."
                v-model="item.Name"
              ></div>
            <div class="ingredient-amount right">
              <input
                type="number"
                class="ingredient-amount-input"
                placeholder="用量"
                v-model="item.Number"
              >
              <input
                type="text"
                class="ingredient-unit-input"
                placeholder="单位"
                v-model="item.Unit"
              >
            </div>
          </div>
        </li>
      </ul>
      <button
        class="add-row-btn"
        @click="addBlankIngredient"
      >+ 添加一行</button>
      <div class="title-primary">做菜步骤</div>
      <div
        class="step-wrapper"
        v-for="(item,i) in stepArr"
        :key="i"
      >
        <image
          src="/static/images/icn_delete2.png"
          alt=""
          mode="widthFix"
          class="delete-image-icn"
          @click="deleteStep(i)"
        >
        </image>
        <div>步骤{{i+1}}</div>
        <textarea
          placeholder="请输入步骤详情"
          class="step-textarea"
          auto-height="true"
          v-model="item.Detail"
        ></textarea>
        <div class="clear upload-box-wrapper">
          <div
            class="upload-box"
            v-for="(sub,subi) in item.Imgs"
            :key="sub"
          >
            <image
              :src="sub"
              alt=""
              mode="widthFix"
            >
            </image>
            <image
              src="/static/images/icn_delete2.png"
              alt=""
              mode="widthFix"
              class="delete-upload-icn"
              @click="deleteUploadStepImg(i,subi)"
            >
            </image>
          </div>
          <div class="upload-box">
            <image
              src="/static/images/icn_add.png"
              alt=""
              mode="widthFix"
              class="add-image-icn"
              @click="uploadStepImg(i)"
            >
            </image>
          </div>
        </div>
      </div>
      <button
        class="add-row-btn"
        @click="addBlankStep"
      >+ 添加下一步骤</button>
      <div class="title-primary">温馨提示</div>
      <textarea
        placeholder="你还有什么要说的吗"
        class="remark-textarea"
        auto-height="true"
        v-model="remark"
      ></textarea>
    </div>
    <button
      class="default-size-btn primary-btn block-btn all-btn-position"
      @click="createBtn"
    >创建菜谱</button>
  </div>
</template>

<script>
import editBar from "@/components/search";
import request from "@/utils/http";

export default {
  data() {
    return {
      icn: "/static/images/icn_edit.png",
      coverUrl: "test",
      //1-荤菜  2-素菜 3-半荤 4-汤
      categoryType: 0,
      categoryArr: [
        {
          name: "荤菜",
          type: 1
        },
        {
          name: "素菜",
          type: 2
        },
        {
          name: "半荤",
          type: 3
        },
        {
          name: "汤",
          type: 4
        }
      ],
      ingredientsArr: [
        {
          Name: "",
          Unit: "",
          Number: ""
        }
      ],
      stepArr: [
        {
          Detail: "",
          Imgs: []
        }
      ],
      remark: ""
    };
  },
  components: {
    "edit-bar": editBar
  },
  methods: {
    createBtn() {
      let name = this.$refs.name.getInputValue();
      let iTemp = this.ingredientsArr.filter(item => item.Name != "");
      let sTemp = this.stepArr.filter(item => item.Detail != "");
      if (!name) {
        wx.showToast({
          icon: "none",
          title: "请填写菜谱名称",
          duration: 2000
        });
        return;
      }
      if (!this.coverUrl) {
        wx.showToast({
          icon: "none",
          title: "请选择菜谱封面",
          duration: 2000
        });
        return;
      }
      if (this.categoryType == 0) {
        wx.showToast({
          icon: "none",
          title: "请选择菜谱分类",
          duration: 2000
        });
        return;
      }
      if (iTemp.length == 0) {
        wx.showToast({
          icon: "none",
          title: "请填写需要的食材",
          duration: 2000
        });
        return;
      }
      if (sTemp.length == 0) {
        wx.showToast({
          icon: "none",
          title: "请填写做菜的步骤",
          duration: 2000
        });
        return;
      }
      sTemp = sTemp.map(value => {
        value.Imgs = value.Imgs.join(",");
        return value;
      });
      iTemp = iTemp.map(value => {
        value.Number = +value.Number;
        return value;
      });
      let info = {
        Name: name,
        Cover: this.coverUrl,
        Remark: this.remark,
        Category: this.categoryType,
        Step: sTemp,
        Ingredients: iTemp
      };
      request({
        url: "/menu",
        mask: true,
        data: info
      }).then(res => {
        wx.showToast({
          icon: "none",
          title: "菜谱创建成功",
          duration: 2000
        });
        wx.navigateTo({
          url: "/pages/detail/main?id=" + res.Id
        });
      });
    },
    selectCategory(type) {
      this.categoryType = type;
    },
    addBlankIngredient() {
      this.ingredientsArr.push({
        Name: "",
        Unit: "",
        Number: ""
      });
    },
    deleteIngredient(index) {
      if (this.ingredientsArr.length <= 1) {
        wx.showToast({
          icon: "none",
          title: "最后一行请勿删除",
          duration: 2000
        });
        return;
      }
      this.ingredientsArr.splice(index, 1);
    },
    addBlankStep() {
      this.stepArr.push({
        Detail: "",
        Imgs: []
      });
    },
    deleteStep(index) {
      if (this.stepArr.length <= 1) {
        wx.showToast({
          icon: "none",
          title: "最后一行请勿删除",
          duration: 2000
        });
        return;
      }
      this.stepArr.splice(index, 1);
    },
    uploadStepImg(index) {
      this.stepArr[index].Imgs.push("");
    },
    deleteUploadStepImg(index, subIndex) {
      this.stepArr[index].Imgs.splice(subIndex, 1);
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
  height: rpx(15);
  margin-right: rpx(15);
}
.ingredient-amount {
  color: #b5b5b5;
  font-size: 0;
}
.i-block-middle {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 60rpx);
}
.ingredient-name-input {
  width: rpx(140);
  font-size: rpx(12);
}
.ingredient-amount-input {
  width: rpx(50);
  font-size: rpx(12);
  display: inline-block;
}
.ingredient-unit-input {
  width: rpx(30);
  font-size: rpx(12);
  display: inline-block;
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
  position: relative;
}
.delete-image-icn {
  position: absolute;
  width: rpx(20);
  height: rpx(20);
  right: rpx(15);
  top: rpx(15);
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
  .delete-upload-icn {
    position: absolute;
    width: rpx(20);
    height: rpx(20);
    right: rpx(-5);
    top: rpx(-5);
    left: initial;
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

<template>
  <div class="clear upload-box-wrapper">
    <div
      class="upload-box"
      v-for="(item,index) in files"
      :key="item"
    >
      <image
        :src="item"
        alt=""
        mode="aspectFill"
      >
      </image>
      <image
        src="/static/images/icn_delete2.png"
        alt=""
        mode="widthFix"
        class="delete-upload-icn"
        @click="deleteImg(index)"
      >
      </image>
    </div>
    <div
      class="upload-box"
      v-if="files.length<3"
    >
      <image
        src="/static/images/icn_add.png"
        alt=""
        mode="widthFix"
        class="add-image-icn"
        @click="chooseImage"
      >
      </image>
    </div>
  </div>
</template>

<script>
import { uploadMixin } from "@/utils/mixins";
export default {
  mixins: [uploadMixin],
  data() {
    return {
      maxImg: 3
    };
  },
  methods: {
    getStepUrls() {
      return this.getUpImg();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../sass/function.scss";

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
    height: 100%;
    left: 0;
    top: 0;
    border-radius: rpx(4);
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
    background-color: #fff;
    border-radius: rpx(2);
  }
}
</style>

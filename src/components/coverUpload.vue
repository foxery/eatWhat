<template>
  <div>
    <div class="relative">
      <div class="banner-wrapper">
        <image
          src="/static/images/upload_bg.jpg"
          alt=""
          mode="aspectFill"
          v-if="files.length==0"
        >
        </image>
        <template v-else>
          <image
            :src="item"
            alt=""
            mode="aspectFill"
            v-for="item in files"
            :key="item"
          >
          </image>
        </template>
      </div>
      <div
        class="create-btn-wrapper"
        @click="chooseImage"
        v-if="files.length==0"
      >
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
  </div>
</template>

<script>
import { uploadMixin } from "@/utils/mixins";
export default {
  mixins: [uploadMixin],
  data() {
    return {
      maxImg: 1
    };
  },
  methods: {
    getCoverUrls() {
      return this.getUpImg();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../sass/function.scss";

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
</style>

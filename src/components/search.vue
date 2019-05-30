<template>
  <div class="relative">
    <input
      type="text"
      class="search-input"
      placeholder-style="color: #cacaca;"
      placeholder="搜索..."
      confirm-type="search"
      @focus="focus"
      @blur="blur"
      :class="{'focus':isFocus}"
    >
    <image
      src="/static/images/icn_search.png"
      alt=""
      mode="widthFix"
      class="search-icn"
    >
    </image>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/variable.scss";
@import "../sass/function.scss";

.search-icn {
  width: rpx(25);
  display: block;
  position: absolute;
  left: 0;
  top: rpx(10);
}
.search-input {
  border-bottom: rpx(1) solid #eeeeee;
  padding: rpx(10) rpx(10) rpx(10) rpx(35);
  font-size: rpx(14);
  color: #535353;
  display: block;
  transition: border-color 0.3s ease-in-out;
  &.focus {
    border-color: #535353;
  }
}
</style>

<template>
  <div class="relative">
    <input
      type="text"
      class="search-input"
      placeholder-style="color: #cacaca;"
      :placeholder="placeholder"
      :confirm-type="btnType"
      @focus="focus"
      @blur="blur"
      :class="{'focus':isFocus}"
    >
    <image
      :src="icn"
      alt=""
      mode="widthFix"
      class="search-icn"
    >
    </image>
  </div>
</template>

<script>
export default {
  props: {
    icn: {
      type: String,
      default: "/static/images/icn_search.png"
    },
    placeholder: {
      type: String,
      default: "搜索..."
    },
    btnType: {
      type: String,
      default: "search"
    }
  },
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

<template>
  <div class="container">
    <div class="wrapper">
        1
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
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
</style>

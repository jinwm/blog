<template>
  <transition name="on">
    <div v-if="show" class="topbar">
      <a href="javascript:;" title="JINWM's blog" class="logo">JINWM</a>
      <div class="navbox">
        <a href="javascript:;" title="个人简介" class="nav-item">个人简介</a>
        <a href="javascript:;" title="航拍作品" class="nav-item">航拍作品</a>
        <a href="javascript:;" title="技术分享" class="nav-item">技术分享</a>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data: function () {
    return {
      show: false,
    };
  },
  mounted: function () {
    this.show = true;
  },
};
</script>
<style lang="less" scoped>
.on-enter,
.on-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px 30px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  transition: all 1s;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 8px 150px rgba(0, 0, 0, 1);
    pointer-events: none;
  }

  .logo {
    font-size: 28px;
    position: relative;
    z-index: 1;
  }

  .navbox {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    .nav-item {
      display: inline-block;
      width: 180px;
      height: 50px;
      text-align: center;
      font-size: 14px;
      line-height: 50px;
      margin: 0 20px;
    }
  }
}
</style>

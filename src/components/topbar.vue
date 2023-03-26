<template>
  <transition name="on">
    <div v-if="show" class="topbar" :class="className">
      <div class="inner">
        <router-link to="/">
          <a href="javascript:;" title="JINWM" class="logo">JINWM</a>
        </router-link>
        <div class="navbox">
          <router-link to="/">
            <a href="javascript:;" title="博客首页" class="nav-item"
              >博客首页</a
            >
          </router-link>
          <!-- <router-link to="/"> -->
          <a href="javascript:;" title="个人简介" class="nav-item">个人简介</a>
          <!-- </router-link> -->
          <router-link to="/picture">
            <a href="javascript:;" title="航拍作品" class="nav-item"
              >航拍作品</a
            >
          </router-link>
          <!-- <router-link to="/"> -->
          <a href="javascript:;" title="技术分享" class="nav-item">技术分享</a>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data: function () {
    return {
      show: false,
      className: "pattern1",
    };
  },
  mounted: function () {
    this.show = true;
    let self = this;

    document.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > 100) {
        return (self.className = "pattern2");
      }
      self.className = "pattern1";
    });
  },
  beforeDestroy: function () {
    document.removeEventListener("scroll");
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
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  padding: 0 40px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  transition: transform 1s;

  .inner {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.pattern1 {
    background: transparent;
    .nav-item,
    a {
      color: #f5f5f5;
    }
    &::after {
      content: "";
      position: absolute;
      top: -100%;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      height: 100%;
      pointer-events: none;
      box-shadow: 0 8px 150px rgba(0, 0, 0, 1);
    }
  }
  &.pattern2 {
    background: #f5f5f5;
    .nav-item,
    a {
      color: #333333;
    }
  }

  .logo {
    font-size: 22px;
    position: relative;
    z-index: 1;
  }

  .navbox {
    width: 520px;
    display: flex;
    align-items: center;
    justify-content: right;
    position: relative;
    z-index: 1;

    .nav-item {
      flex: 1;
      height: 50px;
      text-align: center;
      font-size: 14px;
      line-height: 50px;
      margin: 0 0 0 40px;
      transition: all 0.3s ease-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

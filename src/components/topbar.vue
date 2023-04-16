<template>
  <div class="topbar" :class="className">
    <div class="inner">
      <router-link to="/" title="JINWM" class="logo">JINWM</router-link>
      <div class="navbox">
        <router-link
          :class="['nav-item', $route.path == navItem.path ? 'on' : '']"
          v-for="(navItem, index) in navList"
          :to="navItem.path"
          :key="index"
          >{{ navItem.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      show: false,
      className: "pattern1",
      navList: [
        { name: "首页", path: "/" },
        // {name:'个人简介',path:''},
        { name: "航拍", path: "/picture" },
        // {name:'技术分享',path:''},
      ],
    };
  },
  mounted: function () {
    let self = this;
    // console.log(this.$route.path);

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
.topbar {
  width: 100%;
  padding: 0 10%;
  height: 1.2rem;
  box-sizing: border-box;

  .inner {
    // max-width: 12rem;
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
    font-size: 0.35rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 1;
  }

  .navbox {
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: right;

    z-index: 1;

    .nav-item {
      display: block;
      white-space: nowrap;
      height: 0.2rem;
      text-align: center;
      font-size: 0.24rem;
      line-height: 0.2rem;
      margin-left: 0.7rem;
      transition: all 0.3s ease-out;
      opacity: 0.72;

      &.on,
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

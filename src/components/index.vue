<template>
  <transition name="scale">
    <div v-if="pageShow" class="container">
      <div class="topbar">
        <a href="javascript:;" title="JINWM's blog" class="logo">JINWM</a>
        <div class="navbox">
          <a href="javascript:;" title="个人简介" class="nav-item">个人简介</a>
          <a href="javascript:;" title="航拍作品" class="nav-item">航拍作品</a>
          <a href="javascript:;" title="技术分享" class="nav-item">技术分享</a>
        </div>
      </div>
      <div class="main">
        <!-- <div class="slogan">JINWM个人博客</div> -->
        <div class="slogan">JIJIJIJ</div>
        <div class="desc">
          <span>{{ desc.txt.slice(0, desc.ind) }}</span>
          <i v-if="desc.ind < desc.txt.length"></i>
        </div>
        <div class="btns">
          <a href="javascript:;" title="按钮" class="btn">按钮</a>
          <a href="javascript:;" title="按钮" class="btn">按钮</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "index",
  props: {
    msg: String,
  },
  data: function () {
    return {
      pageShow: false,
      desc: {
        ind: 0,
        txt: "欢迎来到我的个人博客，\n这里记录着我的航拍作品，以及前端技术的探索和实践。\n用镜头记录美好，用代码书写未来，\n让我们一起探寻更多可能性吧！",
      },
    };
  },
  mounted: function () {
    this.pageShow = true;

    setTimeout(() => {
      setInterval(() => {
        if (this.desc.txt.length > this.desc.ind) {
          this.desc.ind += 1;
        }
      }, 195);
    }, 1200);
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat center center / 1920px auto;
    pointer-events: none;
    z-index: -1;
    transition: transform 1.6s;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
    pointer-events: none;
  }

  .topbar {
    position: relative;
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

  .main {
    position: absolute;
    width: 800px;
    height: 280px;
    top: 50%;
    left: 50%;
    margin: -165px 0 0 -400px;
    transition: all 0.6s 0.6s ease-in-out;

    .slogan {
      font-size: 50px;
      color: #fff;
      letter-spacing: 4px;
    }

    .desc {
      margin: 20px 0 30px;
      line-height: 27px;
      width: 100%;
      min-height: 70px;
      span {
        color: #fff;
        letter-spacing: 8px;
        font-size: 16px;
        white-space: pre;
        transition: all 1s;
      }
      i {
        display: inline-block;
        height: 1.2em;
        width: 2px;
        margin-top: -3px;
        background: #fff;
        vertical-align: middle;
        animation: opacity 0.5s infinite ease-in-out alternate;
        pointer-events: none;

        @keyframes opacity {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;

      .btn {
        margin: 0 20px;
        width: 160px;
        height: 40px;
        border: 2px solid #fff;
        box-sizing: border-box;
        border-radius: 30px;
        text-align: center;
        font-size: #fff;
        line-height: 40px;
      }
    }
  }
}

// 过渡
.scale-enter-active,
.scale-leave-active {
}
.scale-enter, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  &::after {
    transform: scale(1.2);
  }

  .topbar {
    transform: translateY(-100%);
    opacity: 0;
  }

  .main {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>

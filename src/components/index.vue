<template>
  <transition name="on">
    <div v-if="pageShow" class="container">
      <div class="main">
        <div class="slogan">JINWM个人博客</div>
        <div class="desc">
          <span>{{ descTxt }}</span>
          <i v-if="descTxt.length < desc.txt.length"></i>
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
  data: function () {
    return {
      pageShow: false,
      descTimer: null,
      desc: {
        index: 0,
        txt: "欢迎来到我的个人博客，\n这里记录着我的航拍作品，以及前端技术的探索和实践。\n用镜头记录美好，用代码书写未来，\n让我们一起探寻更多可能性吧！",
      },
    };
  },
  computed: {
    descTxt: function () {
      let { txt, index } = this.desc;
      return txt.slice(0, index);
    },
  },
  mounted: function () {
    this.pageShow = true;

    setTimeout(() => {
      this.descTimer = setInterval(() => {
        if (this.desc.txt.length < this.desc.index) {
          return clearInterval(this.descTimer);
        }
        this.desc.index++;
      }, 180);
    }, 1100);
  },
  destroyed: function () {
    clearInterval(this.descTimer);
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
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
        animation: opacity 0.4s infinite ease-in-out alternate;
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
.on-enter-active,
.on-leave-active {
}
.on-enter, .on-leave-to /* .fade-leave-active below version 2.1.8 */ {
  &::after {
    transform: scale(1.2);
  }

  .main {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>

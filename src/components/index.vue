<template>
  <transition name="on">
    <div v-if="pageShow" class="container">
      <div class="main">
        <div class="slogan">个人博客</div>
        <div class="desc">
          <span>{{ descTxt }}</span>
          <i v-if="(descTxt.length < desc.txt.length)"></i>
        </div>
        <div class="btns">
          <router-link to="/picture" title="WORKS" class="btn-works"
            >WORKS</router-link
          >
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
        txt: "在这里，记录生活的点滴，\n分享创作的心得，探索无限的可能性。",
        // txt: "欢迎来到我的个人博客，\n这里记录着我的航拍作品，以及前端技术的探索和实践。\n用镜头记录美好，用代码书写未来，\n让我们一起探寻更多可能性吧！",
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
      }, 140);
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
    background: url(../assets/bg.jpg) no-repeat center center / cover;
    pointer-events: none;
    z-index: -1;
    transition: transform 1.6s;
    filter: brightness(85%);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent,
      rgba(0, 0, 0, 0.5)
    );
    pointer-events: none;
  }

  .main {
    position: absolute;
    width: 8rem;
    height: 2.8rem;
    top: 50%;
    left: 50%;
    margin: -1.9rem 0 0 -4rem;
    transition: all 0.6s 0.6s ease-in-out;

    .slogan {
      font-size: 0.65rem;
      color: #f5f5f5;
      letter-spacing: 0.04rem;
    }

    .desc {
      margin: 0.1rem 0 0.4rem;
      line-height: 0.1rem;
      width: 100%;
      min-height: 1.2rem;
      span {
        color: #f5f5f5;
        letter-spacing: 0.12rem;
        font-size: 0.22rem;
        white-space: pre;
        transition: all 1s;
      }
      i {
        display: inline-block;
        height: 0.22rem;
        width: 0.02rem;
        position: relative;
        top: 0.18rem;
        background: #f5f5f5;
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

      .btn-works {
        margin: 0 0.2rem;
        width: 1.8rem;
        height: 0.5rem;
        border: 0.02rem solid #f5f5f5;
        box-sizing: border-box;
        border-radius: 0.3rem;
        text-align: center;
        color: #f5f5f5;
        font-size: 0.24rem;
        line-height: 0.5rem;
        transition: all 0.5s ease-in-out;

        &:hover {
          transform: scale(0.96);
          opacity: 0.9;
        }
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

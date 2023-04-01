<template>
  <div class="container">
    <div class="part part1">
      <div
        class="bannerSwiper"
        ref="bannerSwiper"
        @mouseover="bannerBtnsShow = true"
        @mouseleave="bannerBtnsShow = false"
      >
        <div
          v-for="(src, index) in posters"
          :class="[
            'slide-item',
            index === curShowBannerIndex ? 'cur' : '',
            index === preShowBannerIndex ? 'pre' : '',
          ]"
          :key="index"
        >
          <img :src="src" alt="" />
          <!-- <img src="../assets/bg.jpg" alt="" /> -->
        </div>
        <div :class="['btns', bannerBtnsShow ? 'on' : '']">
          <a href="javascript:;" @click="bannerChange(-1)" class="btn-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </a>
          <a href="javascript:;" @click="bannerChange(1)" class="btn-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="part part2">
      <div class="title-box">
        <div class="title">天空之眼——我的航拍作品</div>
        <div class="desc">
          用无人机记录下了壮观的自然景观和城市风光，让您在视觉上穿越到一个全新的、充满惊喜和美妙的世界。
        </div>
      </div>
      <div v-masonry class="poster-wrap">
        <div
          v-masonry-tile
          v-for="(item, index) in 7"
          :key="index"
          class="masonry-item"
        >
          <div class="posterBox">
            <a href="javascript:;" title="" target="_self">
              <img :src="posters[0]" alt="" />
              <div class="mask-layer"></div>
            </a>
          </div>
          <div class="descBox">
            <div class="top">
              <h4 class="title">宁波东部新城</h4>
              <span class="date">2023-10-12</span>
            </div>
            <p>
              城市魔法师-上海篇城市魔法师-上海篇城市魔法师-上海篇城市魔法师-上海篇城市魔法师-上海篇
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mypicture",
  data: function () {
    return {
      pageShow: false,
      posters: [],
      curShowBannerIndex: 0,
      preShowBannerIndex: 0,
      bannerHandleTimer: null,
      bannerChangeTimer: null,
      bannerBtnsShow: false,
    };
  },
  created: function () {
    // 引入图片
    const images = require.context("../assets/", false, /\.(png|jpe?g|svg)$/);
    this.posters = images.keys().map((key) => "." + images(key));
  },
  mounted: function () {
    this.pageShow = true;
    this.bannerChangeTimer = this.bannerAutoPlay();
  },
  beforeDestroy: function () {
    clearInterval(this.bannerChangeTimer);
  },
  methods: {
    // 顶部banner切换
    bannerChange: function (n) {
      clearInterval(this.bannerChangeTimer);
      // if (this.bannerHandleTimer) return;
      this.bannerChangeTimer = this.bannerAutoPlay();
      var { curShowBannerIndex, preShowBannerIndex, posters } = this;
      if (curShowBannerIndex == 0 && n == -1) {
        curShowBannerIndex = posters.length - 1;
        preShowBannerIndex = 0;
      } else if (curShowBannerIndex == posters.length - 1 && n == 1) {
        curShowBannerIndex = 0;
        preShowBannerIndex = posters.length - 1;
      } else {
        preShowBannerIndex = curShowBannerIndex;
        curShowBannerIndex += n;
      }
      this.curShowBannerIndex = curShowBannerIndex;
      this.preShowBannerIndex = preShowBannerIndex;
      // this.bannerHandleTimer = setTimeout(() => {
      //   this.bannerHandleTimer = null;
      // }, 1000);
    },
    bannerAutoPlay: function () {
      // if (this.bannerChangeTimer) return null;
      return setInterval(() => this.bannerChange(1), 5000);
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100%;
  height: auto;
  background: #f5f5f5;

  .part {
    position: relative;
    width: 100%;
  }

  .bannerSwiper {
    // max-width: 19.2rem;
    margin: 0 auto;
    width: 100%;
    // height: 800px;
    height: 8rem;
    padding: 0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, transparent, transparent, #000);
      pointer-events: none;
      opacity: 0.6;
    }
    // &::after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   z-index: 1;
    //   width: 100%;
    //   height: 30%;
    //   background: linear-gradient(to top, #f5f5f5, transparent, transparent);
    //   pointer-events: none;
    // }

    .slide-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.5s ease-out;

      &.cur {
        opacity: 1;
      }
      &.pre {
        transition: all 0.5s 0.5s ease-out;
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .btns {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -0.5rem;
      width: 100%;
      height: 0.5rem;
      transition: all 0.3s;
      opacity: 0;

      &.on {
        opacity: 1;
      }

      .btn-prev,
      .btn-next {
        position: absolute;
        left: 0;
        width: 0.45rem;
        height: 0.95rem;
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
        transition: all 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-55%, -52%);
        }
      }
      .btn-next {
        left: auto;
        right: 0;
        border-radius: 0;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        svg {
          transform: translate(-45%, -52%);
        }
      }
    }
  }

  .title-box {
    // max-width: 1200px;
    margin: 0.35rem auto 0.2rem;
    background: #f5f5f5;

    &::before {
      content: "";
      position: absolute;
      top: 98%;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 50%;
      // background: linear-gradient(to top, transparent, transparent, #f5f5f5);
      pointer-events: none;
    }

    .title {
      font-size: 0.43rem;
      color: #333333;
      letter-spacing: 0.02rem;
      font-weight: bold;
      padding-bottom: 0.1rem;
    }
    .desc {
      font-size: 0.22rem;
      color: #333333;
      padding: 0.15rem 0.3rem 0.15rem;
      letter-spacing: 0.02rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 0.4rem;
        height: 0.01rem;
        background: #333333;
        top: 0.01rem;
        left: 50%;
        margin-left: -0.2rem;
        opacity: 0.1;
      }
    }
  }
  .poster-wrap {
    // width: 12rem;
    width: 84.5%;
    margin: 0 auto 0.4rem;

    .masonry-item {
      width: calc((93%) / 4);
      margin: 0 0.83% 0;

      .posterBox {
        width: 100%;
        height: fit-content;
        position: relative;

        a {
          display: block;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 0.12rem;
          transition: all 0.3s ease-in-out;

          img {
            display: block;
            width: 100%;
            object-fit: cover;
            pointer-events: none;
            transition: all 0.3s ease-in-out;
          }

          .mask-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            transition: all 0.3s;
          }

          &:hover {
            box-shadow: 0 0.03rem 0.1rem rgba(0, 0, 0, 0.65);
            img {
              transform: scale(1.05);
              filter: brightness(120%);
            }
            .mask-layer {
              opacity: 0;
            }
          }
        }
      }
      .descBox {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        pointer-events: none;
        position: relative;
        z-index: 1;
        top: -0.35rem;

        .top {
          color: #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.1rem;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          margin-bottom: 0.2rem;
          h4 {
            text-align: left;
            white-space: nowrap;
            font-size: 0.18rem;
          }
          .date {
            font-size: 0.18rem;
            text-align: right;
            padding: 0 0.05rem;
            white-space: nowrap;
          }
        }

        p {
          width: 100%;
          padding: 0 0.05rem;
          box-sizing: border-box;
          color: #333333;
          font-size: 0.14rem;
          text-align: left;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .poster-wrap {
    width: 7.5rem !important;
    margin: 0 auto 0.4rem;

    .masonry-item {
      width: calc((92%) / 2) !important;
      margin: 0 2% 0 !important;
    }
  }
}
</style>

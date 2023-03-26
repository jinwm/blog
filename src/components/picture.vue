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
          v-for="(item, index) in posters"
          :key="index"
          class="masonry-item"
        >
          <div class="posterBox">
            <a href="javascript:;" title="" target="_self">
              <img :src="item" alt="" />
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
    this.posters = images.keys().map((key) => images(key));
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
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    // height: 800px;
    height: 600px;
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
      margin-top: -50px;
      width: 100%;
      height: 50px;
      transition: all 0.3s;
      opacity: 0;

      &.on {
        opacity: 1;
      }

      .btn-prev,
      .btn-next {
        position: absolute;
        left: 0;
        width: 45px;
        height: 95px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
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
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        svg {
          transform: translate(-45%, -52%);
        }
      }
    }
  }

  .title-box {
    // max-width: 1200px;
    margin: 35px auto 20px;
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
      font-size: 30px;
      color: #333333;
      letter-spacing: 2px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #333333;
      padding: 15px 0 15px;
      letter-spacing: 6px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 40px;
        height: 1px;
        background: #333333;
        top: 1px;
        left: 50%;
        margin-left: -20px;
        opacity: 0.1;
      }
    }
  }
  .poster-wrap {
    max-width: 1200px;
    margin: 0 auto 40px;

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
          border-radius: 4px;
          transition: all 0.5s ease-out;

          img {
            display: block;
            width: 100%;
            object-fit: cover;
            pointer-events: none;
            transition: all 0.5s ease-out;
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
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
            img {
              transform: scale(1.02);
              filter: brightness(130%);
            }
            .mask-layer {
              opacity: 0;
            }
          }
        }
      }
      .descBox {
        width: 100%;
        box-sizing: border-box;
        transform: translateY(-30px);
        position: relative;
        pointer-events: none;

        .top {
          color: #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 0 10px;

          h4 {
            text-align: left;
            white-space: nowrap;

            .date {
              text-align: left;
              padding: 0 15px;
              margin-bottom: 25px;
              white-space: nowrap;
            }
          }
        }

        p {
          width: 100%;
          padding: 0 5px;
          box-sizing: border-box;
          color: #333333;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
}
</style>

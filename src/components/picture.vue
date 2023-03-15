<template>
  <div class="container">
    <div class="title-box">
      <div class="title">我的作品</div>
      <div class="desc">天空之城 8 周年影像大赛精选</div>
    </div>
    <div class="pic-wrap" ref="v-masonry">
      <div v-for="i in 10" :key="i" class="masonry-item">
        <img src="../assets/bg.jpg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
// 引入瀑布流插件
import { VueMasonryPlugin } from "vue-masonry-css";
import Masonry from "masonry-layout";

export default {
  name: "mypicture",
  directives: {
    Masonry: VueMasonryPlugin,
  },
  data: function () {
    return {};
  },
  mounted: function () {
    new Masonry(this.$refs["v-masonry"], {
      // Masonry 配置项
      itemSelector: "masonry-item",
      percentPosition: true,
      columnWidth: 550,
      gutter :20
    });
    // 在更新数据后，需要重新布局 Masonry
    // this.$watch("list", function () {
    //   masonry.layout();
    // });
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  padding-top: 80px;
  overflow: hidden;
  background: pink;

  .title-box {
    margin: 35px auto 20px;
    .title {
      font-size: 40px;
      color: #fff;
      letter-spacing: 2px;
      font-weight: bold;
      padding-bottom: 15px;
    }
    .desc {
      font-size: 14px;
      color: #fff;
      padding: 25px 0;
      letter-spacing: 6px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 40px;
        height: 1px;
        background: rgba(0, 0, 0, 0.1);
        top: 1px;
        left: 50%;
        margin-left: -20px;
      }
    }
  }
  .pic-wrap {
    width: 1200px;
    height: auto !important;
    margin: 0 auto;
    background: #000;

    .masonry-item {
      width: 550px !important;
      margin: 0 5px 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

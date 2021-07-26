<template>
  <div class="video-wrap">
    <h1>videojs组件示例</h1>
    <div class="video-container">
      <video-player :options="videoOpts"></video-player>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    VideoPlayer: () => import("@/components/VideoPlayer/index"),
  },
  data() {
    return {
      videoOpts: {
        sources: [
          {
            src: "https://vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.video-container {
  width: 600px;
  height: 400px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>

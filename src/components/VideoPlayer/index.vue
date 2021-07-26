<template>
  <div v-if="reseted" class="video-player">
    <video ref="video" class="video-js" />
  </div>
</template>
<script>
import videojs from "video.js";
import video_zhCN from "video.js/dist/lang/zh-CN.json";
import "video.js/dist/video-js.css";
videojs.addLanguage("zh-CN", video_zhCN);
// 引入title组件
import "./customcomponents/TitleBar";
import "./customcomponents/RecordControl";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
      reseted: true,
    };
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initPlayer();
          }
        });
      },
    },
  },
  mounted() {
    if (!this.player) {
      this.initPlayer();
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    initPlayer() {
      const globalOpt = {
        controls: true,
        preload: "auto",
        fluid: true,
        aspectRatio: "16:9",
        language: "zh-CN",
        titleBar: {
          text: "zheshi",
        },
        controlBar: {
          remainingTimeDisplay: false,
          playToggle: {},
          fullscreenToggle: {},
          volumePanel: {
            inline: false,
          },
          recordButton: {
            handleClick: this.handleRecord,
          },
        },
        techOrder: ["html5"],
        plugins: {},
      };
      const options = videojs.mergeOptions(globalOpt, this.options);
      this.player = new videojs(this.$refs.video, options, function () {});
      // this.player.addChild("TitleBar", { text: "The Title of The Video!" });
      this.player.autoplay("muted");
    },
    dispose(callback) {
      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== "Flash") {
          this.player.pause && this.player.pause();
        }
        this.player.dispose();
        this.player = null;
        this.$nextTick(() => {
          this.reseted = false;
          this.$nextTick(() => {
            this.reseted = true;
            this.$nextTick(() => {
              callback && callback();
            });
          });
        });
      }
    },
    handleRecord() {
      console.log("hello");
    },
  },
};
</script>
<style scoped lang="scss">
.video-player {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3,
.video-js.vjs-9-16,
.video-js.vjs-1-1 {
  width: 100%;
  max-width: 100%;
  height: 100%;
}
.video-js .vjs-title-bar {
  background: rgba(0, 0, 0, 0.5);
  color: white;

  /*
    By default, do not show the title bar.
  */
  display: none;
  font-size: 2em;
  padding: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* 
  Only show the title bar after playback has begun (so as not to hide
  the big play button) and only when paused or when the user is 
  interacting with the player.
*/
.video-js.vjs-paused.vjs-has-started .vjs-title-bar,
.video-js.vjs-user-active.vjs-has-started .vjs-title-bar {
  display: block;
}
.vjs-control-bar {
  .vjs-record-control {
    background-image: url(../../assets/images/record.svg);
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 50% 50%;
    cursor: pointer;
  }
}
</style>

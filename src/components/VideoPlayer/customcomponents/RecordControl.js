import videojs from "video.js";
const Button = videojs.getComponent("Button");
const Component = videojs.getComponent("Component");
// 定义录制摄像头视频组件
class RecordButton extends Button {
  constructor(player, options = {}) {
    super(player, options);
    this.handleRecordClick = options.handleClick;
    this.controlText("录制");
  }
  buildCSSClass() {
    return "vjs-control vjs-button vjs-record-control";
  }
  handleClick() {
    console.log("录制");
    this.handleRecordClick();
  }
}
Component.registerComponent("RecordButton", RecordButton);

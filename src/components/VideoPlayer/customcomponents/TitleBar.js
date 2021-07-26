import videojs from "video.js";
// Get the Component base class from Video.js
const Component = videojs.getComponent("Component");
const TitleBar = videojs.extend(Component, {
  constructor: function (player, options) {
    Component.apply(this, arguments);
    console.log(options);
    if (options.text) {
      this.updateTextContent(options.text);
    }
  },

  // The `createEl` function of a component creates its DOM element.
  createEl: function () {
    return videojs.dom.createEl("div", {
      // Prefixing classes of elements within a player with "vjs-"
      // is a convention used in Video.js.
      className: "vjs-title-bar",
    });
  },
  updateTextContent: function (text) {
    // If no text was provided, default to "Title Unknown"
    if (typeof text !== "string") {
      text = "Title Unknown";
    }

    // Use Video.js utility DOM methods to manipulate the content
    // of the component's element.
    videojs.dom.emptyEl(this.el());
    videojs.dom.appendContent(this.el(), text);
  },
});

// Register the component with Video.js, so it can be used in players.
videojs.registerComponent("TitleBar", TitleBar);

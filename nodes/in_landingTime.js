module.exports = function(RED) {
  let interval;

  function LandingTimeNode(config) {
    RED.nodes.createNode(this,config);

    interval = setInterval(() => {
      this.emit("input", {});
    }, 1000);

    this.on('input', (msg) => {
      msg.payload = {};
      let configDate = new Date(config.landingTime);
      let d = new Date();
      d.setUTCFullYear(configDate.getFullYear(), configDate.getMonth(), configDate.getDate());
      d.setUTCHours(configDate.getHours(), configDate.getMinutes(), configDate.getSeconds());
      msg.payload = {
        landingTime: d.getTime()
      };
      this.send(msg);
    });
  }

  LandingTimeNode.prototype.close = function() {
    clearInterval(interval);
  };

  RED.nodes.registerType('landing-time', LandingTimeNode);
}
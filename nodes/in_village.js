module.exports = function (RED) {
  function VillageNode(config) {
    RED.nodes.createNode(this, config);
    this.on('input', (msg) => {
      msg.payload[config.villageType] = {
        x: config.villageX,
        y: config.villageY,
        name: config.name,
        id: config.villageId
      };
      this.send(msg);
    });
  }
  RED.nodes.registerType('village', VillageNode);
}
module.exports = function (RED) {
    function UnitNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            msg.payload['slowestUnit'] = config.slowestUnit;
            msg.payload['worldSpeed'] = config.worldSpeed;
            this.send(msg);
        });
    }
    RED.nodes.registerType('unit', UnitNode);
}
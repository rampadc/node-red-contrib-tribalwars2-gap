module.exports = function (RED) {
    function CommandTypeNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            msg.payload['commandType'] = config.commandType;
            msg.payload['clearing'] = config.commandType === 'attack' ? config.clearing : false;
            this.send(msg);
        });
    }
    RED.nodes.registerType('command-type', CommandTypeNode);
}
module.exports = function (RED) {
    function SupportModifierNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            msg.payload['supportModifiers'] = {
                tactician: config.tactician,
                onTime: config.onTime
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType('support-modifier', SupportModifierNode);
}
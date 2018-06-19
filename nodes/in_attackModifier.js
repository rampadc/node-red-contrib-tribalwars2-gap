module.exports = function (RED) {
    function AttackModifierNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            msg.payload['attackModifiers'] = {
                grandmaster: config.grandmaster,
                masterOfLoot: config.masterOfLoot,
                deceiver: config.deceiver,
                ranger: config.ranger
            };
            this.send(msg);
        });
    }
    RED.nodes.registerType('attack-modifier', AttackModifierNode);
}
const getLaunchDate = require('./getLaunchDate');

module.exports = function (RED) {
    function PlanNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            this.status({});

            // couple of status notices
            if (msg.payload.hasOwnProperty('commandType')) {
                if (msg.payload['commandType'] === 'attack') {
                    this.status({ fill: "red", shape: "ring", text: "Attack" });
                } else if (msg.payload['commandType'] === 'support') {
                    this.status({ fill: "green", shape: "ring", text: "Support" });
                }
            }

            if (msg.payload.hasOwnProperty('clearing')) {
                if (msg.payload['clearing'] === true) {
                    this.status({ fill: "red", shape: "dot", text: "Clearing nuke" });
                }
            }

            if (msg.payload.hasOwnProperty('slowestUnit')) {
                if (msg.payload['slowestUnit'] === 'noble') {
                    this.status({ fill: "blue", shape: "dot", text: "Noble" });
                }
            }

            let launchDate = getLaunchDate(
                msg.payload.source, msg.payload.target,
                msg.payload.landingTime,
                msg.payload.commandType, msg.payload.slowestUnit, msg.payload.worldSpeed,
                msg.payload.attackModifiers, msg.payload.supportModifiers,
                msg.payload.isClearingNuke
            );
            msg.payload['launchDate'] = launchDate;
            this.send(msg);
        });
    }
    RED.nodes.registerType('plan-function', PlanNode);
}
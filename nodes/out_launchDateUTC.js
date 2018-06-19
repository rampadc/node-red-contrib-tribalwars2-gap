function formatDateToUTC(date) {
    // explicity define
    const d = new Date(date);
    return d.toUTCString();
}

module.exports = function (RED) {
    function LaunchDateUTCNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            this.status({ fill: "grey", shape: "dot", text: `${formatDateToUTC(msg.payload.launchDate)}` });
        });
    }
    RED.nodes.registerType('launch-date-utc', LaunchDateUTCNode);
}
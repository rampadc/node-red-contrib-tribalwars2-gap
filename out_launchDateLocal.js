const tz = require('moment-timezone');
const moment = require('moment');

function formatDateToLocal(date, timezone) {
    // explicity define
    const d = moment(date);
    return d.tz(timezone).format("MMMM Do YYYY, h:mm:ss a");
}

module.exports = function (RED) {
    function LaunchDateLocalNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', (msg) => {
            this.status({ fill: "grey", shape: "dot", text: `${formatDateToLocal(msg.payload.launchDate, config.timezone)}` });
        });
    }
    RED.nodes.registerType('launch-date-local', LaunchDateLocalNode);
}
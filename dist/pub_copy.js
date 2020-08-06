"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_mqtt_1 = require("async-mqtt");
const params = require("../assets/config.json");
const client = async_mqtt_1.connect("mqtt://" + params["IP"], {
    clientId: "mqttjs_01",
    username: "ControlTower01"
});
var timer_id = setInterval(function () { client.publish(params["topic"], params["message"]); }, 5000);
function publish(topic, msg, options) {
    console.log("publishing", msg);
    if (client.connected == true) {
        client.publish(topic, msg, options);
    }
}
//# sourceMappingURL=pub_copy.js.map
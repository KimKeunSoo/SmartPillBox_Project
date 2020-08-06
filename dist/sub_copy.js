"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = require("mqtt");
const params = require("../assets/config.json");
const client = mqtt_1.connect("mqtt://" + params["IP"], {
    clientId: "mqttPub10",
    username: "SmartPillBox01"
});
client.on("connect", function () {
    client.subscribe(params["topic"], function (err) {
        console.log("subscribe completed!");
    });
});
client.on("message", function (topic, message) {
    console.log("Message from Public : " + message.toString());
    console.log("Topic is " + topic);
    console.log("Last Message ID : %d", client.getLastMessageId);
    //   client.end();
});
//# sourceMappingURL=sub_copy.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const params = require("../assets/config.json");
const client = mqtt_1.default.connect("mqtt://192.168.50.123");
client.on("connect", function () {
    client.subscribe(params["topic"], function (err) {
        console.log("sub");
    });
});
client.on("message", function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //   client.end();
});
//# sourceMappingURL=sub.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const config = require("../assets/config.json");
let client = null;
if (config.broker.port !== -1) {
    console.log(1);
    client = mqtt_1.default.connect(`mqtt://${config.broker.ip}:${config.broker.port}`);
    console.log(1);
}
else {
    console.log(2);
    client = mqtt_1.default.connect(`mqtt://${config.broker.ip}`);
    console.log(2);
}
if (!client) {
    throw Error(`MQTT.connect() error. (ip: ${config.broker.ip}, port: ${config.broker.port})`);
}
const my_sub_1 = require("./my_sub");
const my_pub_1 = __importStar(require("./my_pub"));
client.on('connect', () => {
    console.log('connected to MQTT broker []');
    config.topics_sub.map((topic, index) => {
        client.subscribe(topic, (err) => {
            if (!err)
                console.log(`subscribed topic (${topic})`);
            if (err)
                console.error(`Error occurred during subscribing topic (${topic})`);
        });
    });
    client.on('message', my_sub_1.onMessage);
    my_pub_1.default(client, config);
    my_pub_1.pub();
});
//# sourceMappingURL=main.js.map
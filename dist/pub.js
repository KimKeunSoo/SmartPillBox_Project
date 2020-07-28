"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = __importStar(require("async-mqtt"));
const prompt = __importStar(require("prompt"));
const bluebird_1 = __importDefault(require("bluebird"));
const brokerIp = `tcp://192.168.50.123:1883`;
const client = mqtt.connect(`${brokerIp}`, { clientId: "pubClient" });
client.on("connect", () => {
    console.log(`Starting pub connecting on ${brokerIp}. . .` + client.connected);
    prompt.start();
    prompt.get(["topic", "message"], (err, result) => {
        if (err) {
            console.log(`Error on prompt.\n${JSON.stringify(err)}`);
            process.exit(1);
        }
        const topic = result.topic;
        const message = result.message;
        bluebird_1.default.join(client.publish(topic, message, { qos: 0, retain: true }), client.end(), result => console.log(`messegeId ${client.getLastMessageId()} : Sending Done.\nstauts result : ${JSON.stringify(result)}`))
            .then(() => {
            client.end();
            console.log(`Publish done.`);
        })
            .catch(error => {
            console.log(`Error occurred during publish.\n${JSON.stringify(error)}`);
        })
            .finally(() => process.exit(1));
    });
});
//# sourceMappingURL=pub.js.map
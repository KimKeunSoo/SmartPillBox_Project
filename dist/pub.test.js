"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const client = mqtt_1.default.connect("mqtt://192.168.50.123");
(async function main() {
    let test = await new Promise((resolve, reject) => {
        client.on("connect", function () {
            resolve("con!!");
        });
    });
    //   console.log(test)
    if (test !== "Connected!!") {
        console.log("Bye~");
    }
    else {
        console.log("Connected!!");
    }
    for (let i = 0; i < 10; i++) {
        client.publish("presence", `Hello ${i}`);
    }
    client.end();
})();
//# sourceMappingURL=pub.test.js.map
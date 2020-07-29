"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const params = require("../assets/config.json");
const client = mqtt_1.default.connect("mqtt://" + params["IP"]);
(async function main() {
    let test = await new Promise((resolve, reject) => {
        client.on("connect", function () {
            resolve("Connected!!");
        });
    });
    //   console.log(test)
    if (test !== "Connected!!") {
        console.log("Cannot Connect.");
        client.end();
    }
    else {
        console.log("Connected!!");
    }
    client.publish(params["topic"], params["message"]);
    console.log("Message are sent!");
    client.end();
})();
//# sourceMappingURL=pub.js.map
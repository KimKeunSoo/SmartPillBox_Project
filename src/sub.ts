import mqtt from "mqtt";

const params = require("../assets/config.json");
const client = mqtt.connect("mqtt://192.168.50.123");

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

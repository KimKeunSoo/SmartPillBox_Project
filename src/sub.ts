import mqtt from "mqtt";

const params = require("../assets/config.json");
const client = mqtt.connect("mqtt://" + params["IP"]);

client.on("connect", function () {
  client.subscribe(params["topic"], function (err) {
    console.log("subscribe completed!");
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log("Message from Public : %s",message.toString());
//   client.end();
});

import mqtt from "mqtt";

const client = mqtt.connect("mqtt://192.168.50.123");
const params = require("../assets/config.json");

(async function main() {
  let test = await new Promise((resolve, reject) => {
    client.on("connect", function () {
      resolve("Connected!!");
    });
  });

//   console.log(test)
  if (test !== "Connected!!") {
    console.log("Cannot Connect.")
    client.end()
  } else {
    console.log("Connected!!");
  }
      
  client.publish(params["topic"], params["message"]);
  client.end()
})();

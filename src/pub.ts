import mqtt from "mqtt";

const params = require("../assets/config.json");
const client = mqtt.connect("mqtt://" + params["IP"]);

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
  console.log("Message are sent!")
  client.end()
})();

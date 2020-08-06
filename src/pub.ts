import mqtt, { connect } from "mqtt";

const params = require("../assets/config.json");
const client = mqtt.connect("mqtt://" + params["IP"]);

(async function main() {
  let test = await new Promise((resolve, reject) => {
    client.on("connect", function () {
      resolve("Connected!!");
    });
  });


  if (test !== "Connected!!") {
    console.log("Cannot Connect.")
    client.end()
  } else {
    console.log("Connected!!");
  }

  console.log("%s", client.options.clientId);


  client.publish(params["topic"], params["message"]);


  console.log("Message are sent!")
  client.end()
})();


import * as prompt from "prompt";
//import Promise from 'bluebird'
import * as mqtt from "mqtt";
import scanf from "scanf";
import { stringify } from "querystring";
import { isUndefined } from "util";

const url = `tcp://192.168.50.123:1883`;
const client = mqtt.connect(url, { clientId: "subClient" });
client.on("connect", () => {
  console.error("connected to MQTT broker");
});

client.on("message", (topic, msg) => {
  console.log(`topic(${topic}): ${msg}`);
});

client.on("error", err => {
  console.log(err);
});

console.log("Waiting to conect the MQTT broker.");
while (client.connected === false) console.log("connect");

let topics: Array<string> = [];


while (true) {
  console.log(
    "Select (0: exit, 1: listen, 2: subscribe, 3: unsubscribe, 4: status): "
  );
  let key = scanf("%d");

  switch (key) {
    case 0:
      console.log("Bye!");
      process.exit(0);
      break;
    case 1:
      console.log("listen");
      break;
    case 2:
      prompt.start();
      prompt.get(["topicName"], (error, result) => {
        if (error) {
          console.error(
            `Error occurred during prompt.\n${JSON.stringify(error)}`
          );
        } else {
          const topicName = result.topicName;

          if (isUndefined(topics.find(result.topicName)) == false) {
            console.log("Already subscribed topic");
          } else {
            client.subscribe(topicName, { qos: 0 }, err => {
              if (err) {
                console.log(`Error occurred during subcribe.`);
              } else {
                console.log(
                  `messegeId ${client.getLastMessageId()} : Subscribe done`
                );
                topics.push(topicName);
              }
            });
          }
        }

        prompt.end();
      });
      break;
    case 3:
        console.log(`Topics currently subscribed`)
        for(let i = 0; i < topics.length; i++) {
            console.log(`\t${i}: ${topics[i]}`)
        }

        console.log(`Select topic to unsubscribe: `)
        let _key = scanf('%d')

        client.unsubscribe(topics[_key], (error, packet) => {
            if(error) {
                console.error(`Error occurred during unsubscribe.\n${JSON.stringify(error)}`)
            } else {
                topics.splice(_key, 1)
                console.log('Done')
            }
        })
      break;
    case 4:
        const os = require('os')
        const interfaces = os.networkInterfaces()
        const names = interfaces.keys()

        names.foreach(elem => {
            interfaces.elem.
            console.log(`${elem}: ${JSON.stringify(interfaces.elem.address)}`)
        })
        
  }
}

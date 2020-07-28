import mqtt from "mqtt";

const client = mqtt.connect("mqtt://192.168.50.123");

(async function main() {
  let test = await new Promise((resolve, reject) => {
    client.on("connect", function () {
      resolve("con!!");
    });
  });

//   console.log(test)
  if (test !== "Connected!!") {
    console.log("Bye~");
  } else {
    console.log("Connected!!");
  }

  for(let i = 0 ; i < 10 ; i++){
      client.publish("presence", `Hello ${i}`);
  }

  client.end()
})();

import * as mqtt from "async-mqtt"
import * as prompt from "prompt"
import Promise from "bluebird"

const brokerIp = `tcp://192.168.50.123:1883`
const client = mqtt.connect(`${brokerIp}`, { clientId: "pubClient" })

client.on("connect", () => {
  
  console.log(`Starting pub connecting on ${brokerIp}. . .` + client.connected)

  prompt.start()
  prompt.get(["topic", "message"], (err : Error, result) => {
    if (err) {
      console.log(`Error on prompt.\n${JSON.stringify(err)}`)
      process.exit(1)
    }

    const topic = result.topic
    const message = result.message

    Promise.join(
      client.publish(topic, message, { qos: 0, retain: true }),
      client.end(),
      result =>
        console.log(
          `messegeId ${client.getLastMessageId()} : Sending Done.\nstauts result : ${JSON.stringify(
            result
          )}`
        )
    )
      .then(() => {
        client.end()
        console.log(`Publish done.`)
      })
      .catch(error => {
        console.log(`Error occurred during publish.\n${JSON.stringify(error)}`)
      })
      .finally(() => process.exit(1))
  })
})


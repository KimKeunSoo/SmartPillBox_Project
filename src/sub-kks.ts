
import * as prompt from 'prompt'
//import Promise from 'bluebird'
import * as mqtt from 'mqtt'
import scanf from "scanf"
import { stringify } from 'querystring'

const brokerIp = `tcp://192.168.50.123:1883`
const client = mqtt.connect(`${brokerIp}`,{clientId : "subClient"})

let os = require('os')
let ifaces = os.networkInterfaces(client)

client.on("connect", ()=>{
    console.log(`\nStarting sub connecting on ${brokerIp}. . .` + client.connected+`\n`)
    console.log("1:listen, 2:subscribe, 3:dissubscribe, 4:status")
    const key = scanf('%d')
    while(client.connected == true){
    switch(key){
        case 1:{
            break
        }
        case 2:{
            prompt.start()
            prompt.get(["topicName"], (err, result) => {
                if (err) {
                    console.log(`Error occurred during prompt.\n${JSON.stringify(err)}`)
                    process.exit(1)
                }
                const topicName = result.topicName
                client.subscribe(topicName, {qos:0},(err)=>{
                    if(err){
                        console.log(`Error occurred during subcribe.`)
                        process.exit(1)
                    }else{
                        console.log(`messegeId ${client.getLastMessageId()} : Subscribe done`)
                    }
                })
            })
            prompt.end()
            break
        }
        case 3:{
            //1. show subscribe array 
            //2. select which one to delete subscribe
            let topicName : string = `test1`
            //3. show done message with stdout
            client.unsubscribe(topicName, (err)=>{
                if(err){
                    console.log(`Error occurred during unsubcribe.`)
                    process.exit(1)
                }else{
                    console.log(`messegeId ${client.getLastMessageId()} : TopicName - ${topicName} Unsubscribe done`)
                }
            })
            
        }
        case 4:{
            //1. show myIP and serverIP
            //2. show subscribe array
        }
    }}
});

client.on("message", (topic, msg)=>{
    console.log("message is " + msg)
    console.log("topic is " + topic)
})

client.on("error", (err)=>{
    console.log(err)
    client.end()
})
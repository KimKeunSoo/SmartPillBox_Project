import { connect } from "async-mqtt"

const params = require("../assets/config.json")
const client = connect("mqtt://" + params["IP"], {
  clientId : "mqttjs_01", 
  username : "ControlTower01"
})




var timer_id=setInterval(function(){client.publish(params["topic"], params["message"])},5000);

function publish(topic,msg,options){
  console.log("publishing",msg);
if (client.connected == true){
  client.publish(topic,msg,options);
}}

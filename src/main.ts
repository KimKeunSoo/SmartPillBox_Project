type ConfigBroker = {
    ip: string,
    port: number
};

export type MyConfig = {
    broker: ConfigBroker;
    topics_sub: Array<string>;
    topic_pub: string;
};

import mqtt, {MqttClient} from "mqtt";

const config:MyConfig = require("../assets/config.json");

let client: MqttClient | null = null;

if(config.broker.port !== -1) {
    console.log(1);
    client = mqtt.connect(`mqtt://${config.broker.ip}:${config.broker.port}`);
    console.log(1);
} else {
    console.log(2);
    client = mqtt.connect(`mqtt://${config.broker.ip}`);
    console.log(2);
}

if(!client) {
    throw Error(`MQTT.connect() error. (ip: ${config.broker.ip}, port: ${config.broker.port})`);
}

import {onMessage} from './my_sub';
import init, {pub} from './my_pub';

client.on('connect', () => {
    console.log('connected to MQTT broker []');

    config.topics_sub.map((topic, index) => {
        client!.subscribe(topic, (err) => {
            if(!err)
                console.log(`subscribed topic (${topic})`);

            if(err)
                console.error(`Error occurred during subscribing topic (${topic})`);
        });
    });
   
    client!.on('message', onMessage);

    init(client!, config);
    pub();
});
import {MyConfig} from './main';
import {MqttClient} from 'mqtt';

let initialized: boolean = false;

let _client: MqttClient | null = null;
let _config: MyConfig | null = null;

export const pub = () => {
  if(!initialized) {
    throw Error ('pub must be initialized.')
  };

  const periodicMessage = () => {
    _client!.publish(_config!.topic_pub, 'hello world');

    setTimeout(periodicMessage, 1000);
  }

  periodicMessage();
}

export default function init(client: MqttClient, config:MyConfig) {
  _client = client;
  _config = config;

  initialized = true;
}
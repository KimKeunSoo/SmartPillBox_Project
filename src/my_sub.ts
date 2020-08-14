const sub_001 = (message) => {
  console.log(`sub_001(message: ${message})`);
}

export const onMessage = (topic, message) => {

  switch(topic) {
    case 'service/smartpillbox/001':
      sub_001(message);
      break;
    
    case 'service/control_tower':
      console.log(`message received from topic (${topic}) message(${message})`)
      break;

    default:
      console.log(`unknown topic ${topic}`);
  }
}
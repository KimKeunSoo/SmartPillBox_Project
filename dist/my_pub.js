"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let initialized = false;
let _client = null;
let _config = null;
exports.pub = () => {
    if (!initialized) {
        throw Error('pub must be initialized.');
    }
    ;
    const periodicMessage = () => {
        _client.publish(_config.topic_pub, 'hello world');
        setTimeout(periodicMessage, 1000);
    };
    periodicMessage();
};
function init(client, config) {
    _client = client;
    _config = config;
    initialized = true;
}
exports.default = init;
//# sourceMappingURL=my_pub.js.map
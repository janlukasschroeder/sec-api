const io = require('socket.io-client');
const config = require('./config');
const events = require('events');
const store = {};

const initSocket = apiKey => {
  const uri = config.io.server + '/' + config.io.namespace.allFilings;
  const params = { query: { apiKey } };
  store.socket = io(uri, params);
  store.socket.on('connect', () => console.log('Socket connected to', uri));
  store.socket.on('filing', handleNewFiling);
  store.socket.on('error', console.error);
};

const handleNewFiling = filing => {
  store.eventEmitter.emit('filing', filing);
};

module.exports.close = () => {
  if (store.socket.close) {
    store.socket.close();
  }
};

module.exports = apiKey => {
  initSocket(apiKey);
  store.eventEmitter = new events.EventEmitter();
  return store.eventEmitter;
};

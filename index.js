const io = require('socket.io-client');
const config = require('./config');
const events = require('events');
const store = {};

const initSocket = () => {
  const uri = config.io.server + '/' + config.io.namespace.allFilings;
  store.socket = io(uri);
  store.socket.on('connect', () => console.log('Socket connected to', uri));
  store.socket.on('filing', handleNewFiling);
};

const handleNewFiling = filing => {
  store.eventEmitter.emit('filing', filing);
};

module.exports.close = () => {
  if (store.socket.close) {
    store.socket.close();
  }
};

module.exports = () => {
  initSocket();
  store.eventEmitter = new events.EventEmitter();
  return store.eventEmitter;
};

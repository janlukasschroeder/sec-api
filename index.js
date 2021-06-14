#!/usr/bin/env node

const io = require('socket.io-client');
const config = require('./config');
const events = require('events');
const axios = require('axios');

const store = { apiKey: '' };

const setApiKey = (apiKey) => {
  store.apiKey = apiKey;
};

/*
 * Stream API
 */
const streamApiStore = {};

const initSocket = (apiKey) => {
  const uri = config.io.server + '/' + config.io.namespace.allFilings;
  const params = { query: { apiKey } };
  streamApiStore.socket = io(uri, params);
  streamApiStore.socket.on('connect', () =>
    console.log('Socket connected to', uri)
  );
  streamApiStore.socket.on('filing', handleNewFiling);
  streamApiStore.socket.on('filings', handleNewFilings);
  streamApiStore.socket.on('error', console.error);
};

const handleNewFiling = (filing) => {
  console.log(filing);
  streamApiStore.eventEmitter.emit('filing', filing);
};

const handleNewFilings = (filings) => {
  console.log(filing);
  streamApiStore.eventEmitter.emit('filings', filings);
};

const close = () => {
  if (streamApiStore.socket.close) {
    streamApiStore.socket.close();
  }
};

const connect = (apiKey) => {
  setApiKey(apiKey);
  initSocket(apiKey);
  streamApiStore.eventEmitter = new events.EventEmitter();
  modules.streamApi.on = streamApiStore.eventEmitter.on;
  return streamApiStore.eventEmitter;
};

/*
 * Query API
 */

/**
 * Query filings
 *
 * @param {String} query The query string
 * @returns {Object}     The response from the API
 */
const getFilingsQuery = async (query) => {
  const options = {
    method: 'post',
    url: config.queryApi.endpoint,
    headers: { Authorization: store.apiKey },
    data: query,
  };

  const { data } = await axios(options);

  return data;
};

/**
 * Full-text Search API
 */
const getFilingsFullText = async (query) => {
  const options = {
    method: 'post',
    url: config.fullTextApi.endpoint,
    headers: { Authorization: store.apiKey },
    data: query,
  };

  const { data } = await axios(options);

  return data;
};

/**
 * Helpers
 */
const modules = {
  setApiKey,
  streamApi: {
    setApiKey,
    connect,
    close,
  },
  queryApi: {
    setApiKey,
    getFilings: getFilingsQuery,
  },
  fullTextSearchApi: {
    setApiKey,
    getFilings: getFilingsFullText,
  },
};

module.exports = modules;

/**
 * Command Line Execution - Stream API
 */
if (require.main === module) {
  const apiKey = process.argv[2];
  const emitter = connect(apiKey);
  emitter.on('filing', (filing) =>
    console.log(JSON.stringify(filing, null, 1))
  );
}

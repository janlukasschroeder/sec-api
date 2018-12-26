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

module.exports = () => {
  console.log('Called');
  initSocket();
  store.eventEmitter = new events.EventEmitter();
  return store.eventEmitter;
};

const a = {
  companyName: 'WALT DISNEY CO/ (0001001039) (Issuer)',
  type: '4',
  description: 'FORM 4',
  linkToFilingDetails:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/0001001039-18-000235-index.htm',
  linkToHtmlAnnouncement:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/xslF345X03/wf-form4_154544051056009.xml',
  announcedAt: '2018-12-21T20:02:07-05:00'
};

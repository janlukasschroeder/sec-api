module.exports = {
  io: {
    server: 'https://api.sec-api.io:3334',
    namespace: {
      allFilings: 'all-filings',
    },
  },
  queryApi: {
    endpoint: 'https://api.sec-api.io',
  },
  fullTextApi: {
    endpoint: 'https://api.sec-api.io/full-text-search',
  },
  renderApi: {
    endpoint: 'https://api.sec-api.io/filing-reader',
  },
  downloadApi: {
    endpoint: 'https://archive.sec-api.io/',
  },
  xbrlToJsonApi: {
    endpoint: 'https://api.sec-api.io/xbrl-to-json',
  },
  extractorApi: {
    endpoint: 'https://api.sec-api.io/extractor',
  },
};

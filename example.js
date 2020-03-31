const api = require('./index')('YOUR_API_KEY');

api.on('filing', filing => console.log(filing));
api.on('filings', filings => console.log(filings));

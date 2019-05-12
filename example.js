const api = require('./index')('your_api_key');

api.on('filing', filing => console.log(filing));

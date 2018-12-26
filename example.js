const api = require('./index')();

api.on('filing', filing => console.log(filing));

const secApi = require('./index');

/**
 * Set your API key
 */
const yourApiKey = 'YOUR_API_KEY';

secApi.setApiKey(yourApiKey);

/**
 * Query API
 */
const { queryApi } = secApi;

const queryExample = async () => {
  const query = {
    query: { query_string: { query: 'formType:"10-Q"' } },
    from: '0',
    size: '10',
    sort: [{ filedAt: { order: 'desc' } }],
  };

  const data = await queryApi.getFilings(query);

  console.log(data);
};

// uncomment
// queryExample();

/**
 * Full-text search API
 */
const { fullTextSearchApi } = secApi;

const fullTextSearchExample = async () => {
  const query = {
    query: '"LPCN 1154"', // drug
    // formTypes: ['8-K', '10-Q'],
    startDate: '2021-01-01',
    endDate: '2021-06-14',
  };

  const data = await fullTextSearchApi.getFilings(query);

  console.log(data);
};

// uncomment
// fullTextSearchExample();

/**
 * Stream API
 */
const { streamApi } = secApi;

// uncomment
// streamApi.connect(yourApiKey);
// streamApi.on('filing', (filing) => console.log(filing));
// streamApi.on('filings', (filings) => console.log(filings));

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
 * Render API
 */
const { renderApi } = secApi;

const renderApiExample = async () => {
  const filingUrl =
    'https://www.sec.gov/Archives/edgar/data/1841925/000121390021032758/ea142795-8k_indiesemic.htm';

  const data = await renderApi.getFilingContent(filingUrl);

  console.log(data);
};

// uncomment
// renderApiExample();

/**
 * Stream API
 */
const { streamApi } = secApi;

// uncomment
// streamApi.connect(yourApiKey);
// streamApi.on('filing', (filing) => console.log(filing));
// streamApi.on('filings', (filings) => console.log(filings));

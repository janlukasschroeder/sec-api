# sec.gov EDGAR API Wrapper

Node.js module to access SEC filings in real-time from https://www.sec.gov/edgar/searchedgar/companysearch.html

# Getting Started

`npm install sec-api`

# Examples

## Node.js

```js
const api = require('sec-api')();

api.on('filing', filing => console.log(filing));
```

## React

```js
import api from 'sec-api';

class Filings extends React.Component {
  componentDidMount() {
    api();

    api.on('filing', filing => console.log(filing));
  }

  // ...
}
```

# Response Format

- `companyName` (string) - name of company
- `type` (string) - sec.gov form type, e.g 10-K
- `description` (string) - description of filing, e.g. OWNERSHIP DOCUMENT
- `linkToFilingDetails` (string) - link to all documents attached to the filing
- `linkToHtmlAnnouncement` (string) - link to filing in HTML format
- `announcedAt` (string) - ISO 8601 conform filing date and time

## Example

```js
{
  companyName: 'WALT DISNEY CO/ (0001001039) (Issuer)',
  type: '4',
  description: 'FORM 4',
  linkToFilingDetails:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/0001001039-18-000235-index.htm',
  linkToHtmlAnnouncement:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/xslF345X03/wf-form4_154544051056009.xml',
  announcedAt: '2018-12-21T20:02:07-05:00'
}
```

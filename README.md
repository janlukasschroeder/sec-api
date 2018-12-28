# sec.gov EDGAR filings real-time API

- No manual, error-prone scraping/crawling required
- Returns any new filing in real-time (10-Q, 10-K, 4, 8, 13-F, etc.)
- API uses websockets
  to access sec.gov EDGAR filings in real-time.
- Maximum of 30 seconds delay between publish time on EDGAR
  and event trigger of API.
- All responses are in JSON format.
- No XBRL (and XML parser) needed.
- Supports client-side (React, React Native, Angular, Vue, etc.), and
  server-side (Node.js, etc.) JavaScript.
- Python, R, Java, and C++ are supported if a websocket plugin is used.
- Data source: https://www.sec.gov/edgar/searchedgar/companysearch.html

![img](https://i.imgur.com/4TjC4fH.gif)

# Getting Started

`npm install sec-api`

# Examples

## Node.js

```js
const api = require('sec-api')();

api.on('filing', filing => console.log(filing));
```

## React

Live Demo: https://codesandbox.io/s/01xqz2ml9l

```js
import api from 'sec-api';

class Filings extends React.Component {
  componentDidMount() {
    const socket = api();
    socket.on('filing', filing => console.log(filing));
  }

  // ...
}
```

# Response Format

- `companyName` (string) - name of company, e.g. WALT DISNEY CO/ (0001001039) (Issuer)
- `cik` (string) - CIK of company, e.g. 0001001039
- `type` (string) - sec.gov form type, e.g 10-K
- `description` (string) - description of filing, e.g. OWNERSHIP DOCUMENT
- `linkToFilingDetails` (string) - link to all documents attached to the filing
- `linkToHtmlAnnouncement` (string) - link to filing in HTML format
- `linkToXbrl` (string) - link to XBRL file (in XML format) of filing. Is not set, if no XBRL file is attached to
  the original filing on EDGAR.
- `announcedAt` (string) - ISO 8601 conform filing date and time, e.g. 2018-12-21T20:02:07-05:00

## Example JSON Response

```js
{
  companyName: 'WALT DISNEY CO/ (0001001039) (Issuer)',
  cik: '0001001039',
  type: '4',
  description: 'FORM 4',
  linkToFilingDetails:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/0001001039-18-000235-index.htm',
  linkToHtmlAnnouncement:
    'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/xslF345X03/wf-form4_154544051056009.xml',
  linkToXbrl: 'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/wf-form4_154544051056009.xml',
  announcedAt: '2018-12-21T20:02:07-05:00'
}
```

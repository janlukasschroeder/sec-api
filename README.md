# sec.gov EDGAR filings real-time API

- **Over 8000** publicly listed companies, ETFs, mutual funds, and investors are covered.
- Every filing is **mapped to a CIK and ticker**.
- **Over 150 form types** are supported, eg 10-Q, 10-K, 4, 8-K, 13-F and many more.
  [See the list of supported form types here.](https://sec-api.io/#list-of-sec-form-types)
- The API returns a new filing as soon as it is published on SEC EDGAR.
- **No XBRL/XML** needed - JSON formatted.
- Python, R, Java, C++, Excel scripts are supported through websockets
- Client- and server-side JavaScript supported (Node.js, React, React Native, Angular, Vue, etc.)
- Free API key available on [sec-api.io](https://sec-api.io)

The official documentation explains how to use the
query API to filter historical filings: [sec-api.io/docs](https://sec-api.io/docs)

Data source: [sec.gov](https://www.sec.gov/edgar/searchedgar/companysearch.html)

# Getting Started

You can use the API in your command line, or develop your own application
using the API as imported package. Both options are explained below.

**Before you start**:

- Install Node.js if you haven't already. On Mac in the command line type `brew install node`.
- Get your free API key here: [sec-api.io](https://sec-api.io)

## Command Line

In your command line, type

1. `npm install sec-api -g` to install the package
2. `sec-api YOUR_API_KEY` to connect to the stream. Replace `YOUR_API_KEY` with
   the API key provided on [sec-api.io](https://sec-api.io)
3. Done! You will filings printed in your command line
   as soon as they are published on SEC EDGAR.

## Node.js

Type in your command line:

1. `mkdir my-project && cd my-project` to create a new folder for your project.
2. `npm init -y` to set up Node.js boilerplate.
3. `npm install sec-api` to install the package.
4. `touch index.js` to create a new file. Copy/paste the example code below
   into the file index.js. Replace `YOUR_API_KEY` with the API key provided on [sec-api.io](https://sec-api.io)

```js
const api = require('sec-api')('YOUR_API_KEY');
api.on('filing', filing => console.log(filing));
```

5. `node index.js` to start listening for new filings. New filings are
   printed in your console as soon as they are published on SEC EDGAR.

## Python

- Install the socket.io client: `pip install "python-socketio[client]"`
- Run the example script below. Get your free API key on [sec-api.io](https://sec-api.io)
  and replace `YOUR_API_KEY` with it.

```python
import socketio

sio = socketio.Client()

@sio.on('connect', namespace='/all-filings')
def on_connect():
    print("Connected to https://socket.sec-api.io/all-filings")

@sio.on('filing', namespace='/all-filings')
def on_filings(filing):
    print(filing)

sio.connect('https://socket.sec-api.io?apiKey=YOUR_API_KEY', namespaces=['/all-filings'])
sio.wait()
```

## React

Live Demo: https://codesandbox.io/s/01xqz2ml9l

```js
import api from 'sec-api';

class Filings extends React.Component {
  componentDidMount() {
    const socket = api('YOUR_API_KEY');
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
  linkToFilingDetails: 'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/0001001039-18-000235-index.htm',
  linkToHtmlAnnouncement: 'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/xslF345X03/wf-form4_154544051056009.xml',
  linkToXbrl: 'https://www.sec.gov/Archives/edgar/data/1001039/000100103918000235/wf-form4_154544051056009.xml',
  announcedAt: '2018-12-21T20:02:07-05:00'
}
```

# Contact

Let me know how I can improve the library or if you have any feature
suggestions. I'm happy to implement them.

Just open a new issue on github here:
[https://github.com/janlukasschroeder/sec-api/issues](https://github.com/janlukasschroeder/sec-api/issues)

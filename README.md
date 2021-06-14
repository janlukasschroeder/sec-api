# sec.gov EDGAR filings query & real-time API

- Covers +18 million SEC Edgar filings for **over 8000** publicly listed companies, ETFs, hedge funds, mutual funds, and investors dating back to 1993.
- Every filing is **mapped to a CIK and ticker**.
- **All +150 form types** are supported, eg 10-Q, 10-K, 4, 8-K, 13-F, S-1, 424B4 and many more.
  [See the list of supported form types here.](https://sec-api.io/#list-of-sec-form-types)
- The API returns a new filing as soon as it is published on SEC EDGAR.
- **No XBRL/XML** needed - JSON formatted.
- 13F holdings API included. Monitor all institutional ownerships in real-time.
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

# Query API

```js
const { queryApi } = require('sec-api');

queryApi.setApiKey('YOUR_API_KEY');

const query = {
  query: { query_string: { query: 'formType:"10-Q"' } }, // get most recent 10-Q filings
  from: '0', // start with first filing. used for pagination.
  size: '10', // limit response to 10 filings
  sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
};

const filings = await queryApi.getFilings(rawQuery);
```

# Full-Text Search API

```js
const { fullTextSearchApi } = require('sec-api');

fullTextSearchApi.setApiKey('YOUR_API_KEY');

const query = {
  query: '"LPCN 1154"',
  formTypes: ['8-K', '10-Q'],
  startDate: '2021-01-01',
  endDate: '2021-06-14',
};

const filings = await fullTextSearchApi.getFilings(rawQuery);
```

# Real-Time Streaming API

Type in your command line:

1. `mkdir my-project && cd my-project` to create a new folder for your project.
2. `npm init -y` to set up Node.js boilerplate.
3. `npm install sec-api` to install the package.
4. `touch index.js` to create a new file. Copy/paste the example code below
   into the file `index.js`. Replace `YOUR_API_KEY` with the API key provided on [sec-api.io](https://sec-api.io)

```js
const { streamApi } = require('sec-api');

streamApi.connect('YOUR_API_KEY');

streamApi.on('filing', (filing) => console.log(filing));
```

5. `node index.js` to start listening for new filings. New filings are
   printed in your console as soon as they are published on SEC EDGAR.

## Command Line

In your command line, type

1. `npm install sec-api -g` to install the package
2. `sec-api YOUR_API_KEY` to connect to the stream. Replace `YOUR_API_KEY` with
   the API key provided on [sec-api.io](https://sec-api.io)
3. Done! You will see new filings printed in your command line
   as soon as they are published on SEC EDGAR.

## React

Live Demo: https://codesandbox.io/s/01xqz2ml9l (requires an API key to work)

```js
import { streamApi } from 'sec-api';

class Filings extends React.Component {
  componentDidMount() {
    const socket = streamApi('YOUR_API_KEY');
    socket.on('filing', (filing) => console.log(filing));
  }

  // ...
}
```

# Response Format

- `accessionNo` (string) - Accession number of filing, e.g. 0000028917-20-000033
- `cik` (string) - CIK of the filing issuer. Important: trailing `0` are removed.
- `ticker` (string) - Ticker of company, e.g. AMOT. A ticker is not available when non-publicly traded companies report filings (e.g. form 4 reported by directors). Please contact us if you find filings that you think should have tickers (but don't).
- `companyName` (string) - Name of company, e.g. Allied Motion Technologies Inc
- `companyNameLong` (string) - Long version of company name including the filer type (Issuer, Filer, Reporting), e.g. ALLIED MOTION TECHNOLOGIES INC (0000046129) (Issuer)
- `formType` (string) - sec.gov form type, e.g 10-K. [See the list of supported form types here.](https://sec-api.io/#list-of-sec-form-types)
- `description` (string) - Description of the form, e.g. Statement of changes in beneficial ownership of securities
- `linkToFilingDetails` (string) - Link to HTML, XML or PDF version of the filing.
- `linkToTxt` (string) - Link to the plain text version of the filing. This file can be multiple MBs large.
- `linkToHtml` (string) - Link to index page of the filing listing all exhibits and the original HTML file.
- `linkToXbrl` (string, optional) - Link to XBRL version of the filing (if available).
- `filedAt` (string) - The date (format: YYYY-MM-DD HH:mm:SS TZ) the filing was filed, eg 2019-12-06T14:41:26-05:00.
- `periodOfReport` (string, if reported) - Period of report, e.g. 2021-06-08
- `effectivenessDate` (string, if reported) - Effectiveness date, e.g. 2021-06-08
- `id` (string) - Unique ID of the filing.
- `entities` (array) - A list of all entities referred to in the filing. The first item in the array always represents the filing issuer. Each array element is an object with the following keys:
  - `companyName` (string) - Company name of the entity, e.g. DILLARD'S, INC. (Issuer)
  - `cik` (string) - CIK of the entity. Trailing 0 are not removed here, e.g. 0000028917
  - `irsNo` (string, optional) - IRS number of the entity, e.g. 710388071
  - `stateOfIncorporation` (string, optional) - State of incorporation of entity, e.g. AR
  - `fiscalYearEnd` (string, optional) - Fiscal year end of the entity, e.g. 0201
  - `sic` (string, optional) - SIC of the entity, e.g. 5311 Retail-Department Stores
  - `type` (string, optional) - Type of the filing being filed. Same as formType, e.g. 4
  - `act` (string, optional) - The SEC act pursuant to which the filing was filed, e.g. 34
  - `fileNo` (string, optional) - Filer number of the entity, e.g. 001-06140
  - `filmNo` (string, optional) - Film number of the entity, e.g. 20575664
- `documentFormatFiles` (array) - An array listing all primary files of the filing. The first item of the array is always the filing itself. The last item of the array is always the TXT version of the filing. All other items can represent exhibits, press releases, PDF documents, presentations, graphics, XML files, and more. An array item is represented as follows:
  - `sequence` (string, optional) - The sequence number of the filing, e.g. 1
  - `description` (string, optional) - Description of the file, e.g. EXHIBIT 31.1
  - `documentUrl` (string) - URL to the file on SEC.gov
  - `type` (string, optional) - Type of the file, e.g. EX-32.1, GRAPHIC or 10-Q
  - `size` (string, optional) - Size of the file, e.g. 6627216
- `dataFiles` (array) - List of data files (filing attachments, exhibits, XBRL files) attached to the filing.
  - `sequence` (string) - Sequence number of the file, e.g. 6
  - `description` (string) - Description of the file, e.g. XBRL INSTANCE DOCUMENT
  - `documentUrl` (string) - URL to the file on SEC.gov
  - `type` (string, optional) - Type of the file, e.g. EX-101.INS, EX-101.DEF or EX-101.PRE
  - `size` (string, optional) - Size of the file, e.g. 6627216
- `seriesAndClassesContractsInformation` (array) - List of series and classes/contracts information
  - `series` (string) - Series ID, e.g. S000001297
  - `name` (string) - Name of entity, e.g. PRUDENTIAL ANNUITIES LIFE ASSUR CORP VAR ACCT B CL 1 SUB ACCTS
  - `classesContracts` (array) - List of classes/contracts. Each list item has the following keys:
    - `classContract` (string) - Class/Contract ID, e.g. C000011787
    - `name` (string) - Name of class/contract entity, e.g. Class L
    - `ticker` (string) - Ticker class/contract entity, e.g. URTLX

## 13F Institutional Ownerships

13F filings report institutional ownerships. Each 13F filing has an attribute `holdings` (array). An array item in holdings represents one holding and has the following attributes:

- `nameOfIssuer` (string) - Name of issuer, e.g. MICRON TECHNOLOGY INC
- `titleOfClass` (string) - Title of class, e.g. COM
- `cusip` (string) - CUSIP of security, e.g. 98850P109
- `value` (integer) - Absolute holding value in $, e.g. 18000. Note: `value` doesn't have to be multiplied by 1000 anymore. It's done by our API automatically.
- `shrsOrPrnAmt` (object)
  - `sshPrnamt` (integer) - Shares or PRN AMT, e.g. 345
  - `sshPrnamtType` (string) - Share/PRN type, e.g. "SH"
- `putCall` (string, optional) - Put / Call, e.g. Put
- `investmentDiscretion` (string) - Investment discretion, e.g. "SOLE"
- `otherManager` (string, optional) - Other manager, e.g. 7
- `votingAuthority` (object)
  - `Sole` (integer) - Sole, e.g. 345
  - `Shared` (integer) - Shared, e.g. 345
  - `None` (integer) - None, e.g. 345

## Example JSON Response

```json
{
  "id": "79ad9e452ea42402df4fe55c636191d6",
  "accessionNo": "0001213900-21-032169",
  "cik": "1824149",
  "ticker": "JOFF",
  "companyName": "JOFF Fintech Acquisition Corp.",
  "companyNameLong": "JOFF Fintech Acquisition Corp. (Filer)",
  "formType": "10-Q",
  "description": "Form 10-Q - Quarterly report [Sections 13 or 15(d)]",
  "filedAt": "2021-06-11T17:25:44-04:00",
  "linkToTxt": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/0001213900-21-032169.txt",
  "linkToHtml": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/0001213900-21-032169-index.htm",
  "linkToXbrl": "",
  "linkToFilingDetails": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321_jofffintech.htm",
  "entities": [
    {
      "companyName": "JOFF Fintech Acquisition Corp. (Filer)",
      "cik": "1824149",
      "irsNo": "852863893",
      "stateOfIncorporation": "DE",
      "fiscalYearEnd": "1231",
      "type": "10-Q",
      "act": "34",
      "fileNo": "001-40005",
      "filmNo": "211012398",
      "sic": "6770 Blank Checks"
    }
  ],
  "documentFormatFiles": [
    {
      "sequence": "1",
      "description": "QUARTERLY REPORT",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321_jofffintech.htm",
      "type": "10-Q",
      "size": "274745"
    },
    {
      "sequence": "2",
      "description": "CERTIFICATION",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321ex31-1_jofffintech.htm",
      "type": "EX-31.1",
      "size": "12209"
    },
    {
      "sequence": "3",
      "description": "CERTIFICATION",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321ex31-2_jofffintech.htm",
      "type": "EX-31.2",
      "size": "12220"
    },
    {
      "sequence": "4",
      "description": "CERTIFICATION",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321ex32-1_jofffintech.htm",
      "type": "EX-32.1",
      "size": "4603"
    },
    {
      "sequence": "5",
      "description": "CERTIFICATION",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/f10q0321ex32-2_jofffintech.htm",
      "type": "EX-32.2",
      "size": "4607"
    },
    {
      "sequence": " ",
      "description": "Complete submission text file",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/0001213900-21-032169.txt",
      "type": " ",
      "size": "2344339"
    }
  ],
  "dataFiles": [
    {
      "sequence": "6",
      "description": "XBRL INSTANCE FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331.xml",
      "type": "EX-101.INS",
      "size": "248137"
    },
    {
      "sequence": "7",
      "description": "XBRL SCHEMA FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331.xsd",
      "type": "EX-101.SCH",
      "size": "43550"
    },
    {
      "sequence": "8",
      "description": "XBRL CALCULATION FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331_cal.xml",
      "type": "EX-101.CAL",
      "size": "21259"
    },
    {
      "sequence": "9",
      "description": "XBRL DEFINITION FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331_def.xml",
      "type": "EX-101.DEF",
      "size": "182722"
    },
    {
      "sequence": "10",
      "description": "XBRL LABEL FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331_lab.xml",
      "type": "EX-101.LAB",
      "size": "309660"
    },
    {
      "sequence": "11",
      "description": "XBRL PRESENTATION FILE",
      "documentUrl": "https://www.sec.gov/Archives/edgar/data/1824149/000121390021032169/joff-20210331_pre.xml",
      "type": "EX-101.PRE",
      "size": "186873"
    }
  ],
  "seriesAndClassesContractsInformation": [],
  "periodOfReport": "2021-03-31",
  "effectivenessDate": "2021-03-31"
}
```

# Contact

Let me know how I can improve the library or if you have any feature
suggestions. I'm happy to implement them.

Just open a new issue on github here:
[https://github.com/janlukasschroeder/sec-api/issues](https://github.com/janlukasschroeder/sec-api/issues)

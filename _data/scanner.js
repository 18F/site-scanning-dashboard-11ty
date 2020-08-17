// axios is a Promise based HTTP client for the browser and node.js
// https://www.npmjs.com/package/axios
const axios  = require('axios');

// Since we're reading our config yaml...
const yaml = require('js-yaml');

// Slugify is used to convert the agency name to URL
const slugify = require("slugify");

// read our config to get agency name
const fs = require('fs');
try {
    let fileContents = fs.readFileSync('_data/config.yml', 'utf8');
    let ymldata = yaml.safeLoad(fileContents);
    
    var safeAgencyName = escape(ymldata['agency'].toLowerCase());
    var domains = ymldata['domainlist'];
} catch (error) {
    console.log(error);
}

// API URL
var scanner_url = `https://site-scanning.app.cloud.gov/api/v1/scans/dap/?agency=` + safeAgencyName;

// old url/ Don't use. https://site-scanning.app.cloud.gov/search200/json/?200page=/code.json&present=Present`

scanner_url = "https://site-scanning.app.cloud.gov/api/v1/domains/" + domains[0] + '/'

module.exports = () => {
  return new Promise((resolve, reject) => {
    // go get the API data
    axios.get(scanner_url).then((response) => {

      var domainScanList = response.data;
      // we've got all the data now. So resolve the promise to return the data
      resolve({'url': scanner_url, 'domainScanList': domainScanList  });
    })
    .catch((error) => {
        reject(error);
    })
  })
}

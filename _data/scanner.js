// axios is a Promise based HTTP client for the browser and node.js
// https://www.npmjs.com/package/axios
const axios  = require('axios');

// Since we're reading our config yaml...
const yaml = require('js-yaml');

// Slugify is used to convert the agency name to URL
const slugify = require("slugify");

// read our config to get agency name
const fs = require('fs');
const { resolve } = require('path');
try {
    let fileContents = fs.readFileSync('_data/config.yml', 'utf8');
    let ymldata = yaml.safeLoad(fileContents);

    var safeAgencyName = escape(ymldata['agency'].toLowerCase());
    var desiredScans = ymldata['scans'];
    var domains = ymldata['domainlist'];
} catch (error) {
    console.log(error);
}

// API URL
// var scanner_url = `https://site-scanning.app.cloud.gov/api/v1/scans/dap/?agency=` + safeAgencyName;
// old url/ Don't use. https://site-scanning.app.cloud.gov/search200/json/?200page=/code.json&present=Present`
//var scanner_url = ""
//"https://site-scanning.app.cloud.gov/api/v1/domains/" + domains[0] + '/'

getScanData = async (scanner_url) => {
  try {
      //const {data} = await axios.get(scanner_url);
      axios.get(scanner_url).then((response) => {
        data = response.data
      })
      return data
      //return axios.get(scanner_url);
  } catch (err) {
      console.log(err.message);
  }   
}
// Helper function to set Domain Data order according to Desired Scans
function mapOrder (domainData) {
  
  domainData.sort( function (a, b) {
    var A = a['scantype'], B = b['scantype'];
    
    if (desiredScans.indexOf(A) > desiredScans.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });
  return domainData;
};

module.exports = () => {
  var domainScans = [];
  var availScans = []
  const allRequests = domains.map(function(item) {
    var scanner_url = `https://site-scanning.app.cloud.gov/api/v1/domains/${item}/`;
    return axios.get(scanner_url).then((response) => {
      domainData = response.data;
      // Now we need to be sure the domainData is ordered and reflects desired scans
      for(var x of domainData) {
        if (!availScans.includes(x.scantype)) {
          availScans.push(x.scantype)
        }
      }
      orderedData = mapOrder(domainData)
      domainScans.push({
        'url': scanner_url,
        'domain': item,
        'domainData': orderedData,
      })
    });
  });
  return new Promise(function(resolve) {
    Promise.all(allRequests).then(function () {
      resolve({
        'domainScans': domainScans,
        'domains': domains,
        'desiredScans': desiredScans,
        'availscans': availScans
      });
    });
  });
}

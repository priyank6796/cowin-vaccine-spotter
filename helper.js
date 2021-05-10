const fetch = require('node-fetch');
const axios = require('axios');
const querystring = require('querystring');
const rp = require('request-promise');

const { vaccineBaseURL, minAge, authorization, vaccinePrivateBaseURL } = require('./config');

const restApi = async (uri, queryParams, headers = {}) => {
  const response = await axios.get(uri, { headers, params: queryParams });
  // console.log(response.data);
  return response.data;
};

const restCall = async (uri, queryParams, headers = {}) => {
  const options = {
    'method': 'GET',
    'url': `${uri}?pincode=${queryParams.pincode}&date=${queryParams.date}`,
    headers,
    json: true
  };
  return await rp(options);
};

const getCurrentDate = () => {
  const nowDate = new Date();
  // return nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
  return `${nowDate.getDate()}-${nowDate.getMonth() + 1}-${nowDate.getFullYear()}`;
};

const checkForAvailableVaccineCenterByPincode = async (pinCode) => {
  const url = vaccineBaseURL;
  const query = {
    pincode: pinCode,
    date: getCurrentDate(),
  };
  const response = await restApi(url, query);

  const availableCenters = [];
  response.centers.forEach((center) => {
    center.sessions.forEach((session) => {
      if(session.available_capacity && session.min_age_limit === minAge) {
        availableCenters.push({
          date: session.date,
          name: center.name,
          pincode: center.pincode,
          available_capacity: session.available_capacity,
        })
      }
    });
  });
  return availableCenters;
};

const checkForAvailableVaccineCenterByPincodePrivate = async (pinCode) => {
  const availableCenters = [];

  const url = vaccinePrivateBaseURL;
  const query = {
    pincode: pinCode,
    date: '10-05-2021',
  };
  const headers = {
    authorization
  };

  try {
    const response = await restCall(url, query, headers);

    response.centers.forEach((center) => {
      center.sessions.forEach((session) => {
        if (session.available_capacity && session.min_age_limit === minAge) {
          availableCenters.push({
            date: session.date,
            name: center.name,
            pincode: center.pincode,
            available_capacity: session.available_capacity,
          })
        }
      });
    });
    console.log(JSON.stringify(availableCenters));
  }
  catch (er) {
    console.log(er.message);
  }
  return availableCenters;
};

module.exports.checkForAvailableVaccineCenterByPincode = checkForAvailableVaccineCenterByPincode;
module.exports.checkForAvailableVaccineCenterByPincodePrivate = checkForAvailableVaccineCenterByPincodePrivate;

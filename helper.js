const fetch = require('node-fetch');
const axios = require('axios');
const querystring = require('querystring');
const { vaccineBaseURL, minAge } = require('./config');

const restApi = async (uri, queryParams) => {
  const response = await axios.get(uri, { params: queryParams });
  // console.log(response.data);
  return response.data;
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
      if(session.available_capacity > 1 && session.min_age_limit === minAge) {
        availableCenters.push({
          date: session.date,
          name: center.name,
          pincode: center.pincode,
          pincode: center.pincode,
          available_capacity: session.available_capacity,
        })
      }
    });
  });
  return availableCenters;
}

module.exports.checkForAvailableVaccineCenterByPincode = checkForAvailableVaccineCenterByPincode;



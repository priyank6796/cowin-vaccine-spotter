const { checkForAvailableVaccineCenterByPincode, checkForAvailableVaccineCenterByPincodePrivate } = require('./helper');
const { sentDiscordNotification } = require('./discord-helper');
const { PinCodes } = require('./config');
const { CronJob } = require('cron');

const timeout =(ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const checkVaccineAvailablity = () => {
  return new CronJob({
    cronTime: '0 */2 * * * *',
    onTick: async () => {
      try {
        console.info(`${new Date()} Cron job Run`);
        for(let i=0; i< PinCodes.length; i++) {
          const response = await checkForAvailableVaccineCenterByPincodePrivate(PinCodes[i]);
          if(response.length > 0) await sentDiscordNotification(response);
          await timeout(200);
        }
      } catch (error) {
        console.log(error);
        // sentDiscordNotification({error: error.message});
      }
    },
    runOnInit: true,
    start: false,
    utcOffset: 0,
  }).start();
};

checkVaccineAvailablity();
// const query = {
//   pincode: 380002,
//   date: '03-05-2021',
// };
//
// (async () => {
//   try{
//     const response = await checkForAvailableVaccineCenterByPincode(query.pincode, query.date);
//     if(response.length > 0) await sentDiscordNotification(response);
//     // console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// })();
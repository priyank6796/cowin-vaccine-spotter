const { checkForAvailableVaccineCenterByPincode } = require('./helper');
const { sentDiscordNotification } = require('./discord-helper');
const { PinCodes } = require('./config');
const { CronJob } = require('cron');

const checkVaccineAvailablity = () => {
  return new CronJob({
    cronTime: '0 */5 * * * *',
    onTick: async () => {
      try {
        console.info(`${new Date()} Cron job Run`);
        for(let i=0; i< PinCodes.length; i++) {
          const response = await checkForAvailableVaccineCenterByPincode(PinCodes[i]);
          if(response.length > 0) await sentDiscordNotification(response);
        }
      } catch (error) {
        sentDiscordNotification({error: error.message});
      }
    },
    runOnInit: false,
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
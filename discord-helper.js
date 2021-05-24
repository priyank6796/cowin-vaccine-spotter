const rp = require('request-promise');
const discordWebhookUrl = require('./config').discordUrl;

const defineDiscordObject = (value) => {
  return {
    title: `${value.district_name} - ${value.pincode}`,
    description: `Vaccine Available in **${value.name}** \n 
    Capacity - **${value.available_capacity}** \n
    Type - **${value.vaccine_type}** \n
    Dose1 - ${value.available_capacity1} \n
    Dose2 - ${value.available_capacity2} \n
    Address - ${value.address}`,
    color: 197,
    isInline: true
  };
};

// const defineDiscordObject = (value) => {
//   return {
//     title: `${value.pincode}`,
//     description: JSON.stringify(value),
//     color: 197,
//     isInline: true
//   };
// };

const message = (data) => {
  const discordObject = {
    username: 'Vaccine Available Alert',
    embeds: [],
  };

  data.forEach((d) => {
    discordObject.embeds.push(defineDiscordObject(d));
  });

  return discordObject;
};

module.exports.sentDiscordNotification = (data) => {
  const options = {
    method: 'POST',
    uri: discordWebhookUrl,
    body: message(data),
    json: true,
  };
  rp(options);
};


const rp = require('request-promise');
const discordWebhookUrl = require('./config').discordUrl;

const defineDiscordObject = (value) => {
  return {
    title: 'Vaccine Available Alert',
    description: JSON.stringify(value),
    color: 197,
    isInline: true
  };

};

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


#Vaccine-spotter (NodeJs)

###Description

- Run a cron job to find available vaccine slot in your area based on pincode and sent notification to discord channel
- It's using conwin open APIs to fetch the data

```
1. Run `npm install`
2. Update config.js with your pinCodes and min-Age 
3. Update discord webhook url to get notification when vaccine available
```

- Cron job runs every 5 min to check available slots based on pin codes.

###How to generate discord webhook url 

https://help.dashe.io/en/articles/2521940-how-to-create-a-discord-webhook-url
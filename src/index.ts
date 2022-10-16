import hurriyetEmlakCron from "./crons/hurriyet-emlak";

var cron = require('node-cron');

cron.schedule('* * * * * *', () => {
   console.log('cron is starting...');
   hurriyetEmlakCron();
});

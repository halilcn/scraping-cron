import hurriyetEmlakCron from './crawlers/hurriyet-emlak'
import cron from 'node-cron'

import './bootstrap'

console.log('cron is starting...')
hurriyetEmlakCron()

/*
cron.schedule('* * * * * *', () => {
  console.log('cron is starting...')

  hurriyetEmlakCron()
})
*/

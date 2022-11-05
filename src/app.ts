import hepsiEmlak from './crawlers/hepsi-emlak'
import cron from 'node-cron'

import './bootstrap'

console.log('cron is starting...')
hepsiEmlak()

/*
cron.schedule('* * * * * *', () => {
  console.log('cron is starting...')

  hurriyetEmlakCron()
})
*/

import hurriyetEmlakCron from './crons/hurriyet-emlak'
import cron from 'node-cron'

cron.schedule('* * * * * *', () => {
  console.log('cron is starting...')

  hurriyetEmlakCron()
})

import hurriyetEmlakCron from './crons/hurriyet-emlak'
import cron from 'node-cron'

import './bootstrap'
import { exit } from 'process'

exit(1)

cron.schedule('* * * * * *', () => {
  console.log('cron is starting...')

  hurriyetEmlakCron()
})

import hepsiEmlak from './crawlers/hepsi-emlak'
import cron from 'node-cron'
import log from 'npmlog'

import './bootstrap'

log.info('general', 'Cron started...')

//0 0 0,2,4,6,8,10,12 * * *
cron.schedule('* * * * * *', async () => {
  await hepsiEmlak()
})

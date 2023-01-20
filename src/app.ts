import hepsiEmlak from './crawlers/hepsiemlak'
import cron from 'node-cron'
import log from 'npmlog'

import './bootstrap'

log.info('general', 'Cron started...')


// development
return;

const crawlers = async () => {
  await hepsiEmlak()
}

// first start
crawlers()

cron.schedule('0 0 * * * *', async () => {
  await crawlers()
})

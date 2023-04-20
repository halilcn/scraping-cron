import hepsiEmlak from './crawlers/hepsiemlak'
import emlakJetCrawler from './crawlers/emlakjet'
import cron from 'node-cron'
import log from 'npmlog'

import './bootstrap'
import sendEmail from './utils/sendEmail'

log.info('general', 'Cron started...')

const crawlers = async () => {
  await hepsiEmlak()
  await emlakJetCrawler()
}

// first start
//crawlers()
// TODO: it is temp
sendEmail()

cron.schedule('0 0 * * * *', async () => {
  await crawlers()
})

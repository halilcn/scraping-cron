import hepsiemlakCrawler from './crawlers/hepsiemlak'
import emlakJetCrawler from './crawlers/emlakjet'
import cron from 'node-cron'
import log from 'npmlog'

import './bootstrap'

log.info('general', 'Cron started...')

const crawlers = async () => {
  await hepsiemlakCrawler()
  await emlakJetCrawler()
}

// first start
crawlers()

cron.schedule('0 0 * * * *', async () => {
  await crawlers()
})

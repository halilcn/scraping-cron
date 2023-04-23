import log from 'npmlog'
import handleAdvertLinks from '../../jobs/handleAdvertLinks'
import handleNotification from '../../jobs/handleNotification'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'
import { EMLAKJET_COMPANY_NAME } from './utils/constants'

const emlakJetCrawler = async () => {
  try {
    log.info(EMLAKJET_COMPANY_NAME, 'started cron...')

    const advertLinks = await getAllLinksOfAdvert()
    const advertList = await handleAdvertLinks(advertLinks, getInfosOnAdvert, EMLAKJET_COMPANY_NAME)
    if (advertList.length > 0) handleNotification(advertList)

    log.info(EMLAKJET_COMPANY_NAME, `total advert link:${advertLinks.length}`)
    log.info(EMLAKJET_COMPANY_NAME, 'finished cron...')
  } catch (err: any) {
    log.error(EMLAKJET_COMPANY_NAME, err.message)
  }
}

export default emlakJetCrawler

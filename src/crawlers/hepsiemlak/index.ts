import advertService from '../../actions/advertService'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'
import { HEPSIEMLAK_COMPANY_NAME } from './utils/constants'
import log from 'npmlog'
import handleAdvertLinks from '../../jobs/handleAdvertLinks'
import handleNotification from '../../jobs/handleNotification'

const hepsiEmlakCrawler = async () => {
  try {
    log.info(HEPSIEMLAK_COMPANY_NAME, 'started cron...')

    const advertLinks = await getAllLinksOfAdvert()
    const advertList = await handleAdvertLinks(advertLinks, getInfosOnAdvert, HEPSIEMLAK_COMPANY_NAME)
    if (advertList.length > 0) handleNotification(advertList)

    log.info(HEPSIEMLAK_COMPANY_NAME, `total advert link:${advertLinks.length}`)
    log.info(HEPSIEMLAK_COMPANY_NAME, 'finished cron...')
  } catch (err: any) {
    log.error(HEPSIEMLAK_COMPANY_NAME, err.message)
  }
}

export default hepsiEmlakCrawler

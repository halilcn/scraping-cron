import log from 'npmlog'
import advertService from '../../actions/advertService'
import { SiteStructureChanged } from '../../utils/errors'
import { convertToLowerCase, isNullAllItemsOnAdvert } from '../../utils/helpers'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'
import { EMLAKJET_COMPANY_NAME } from './utils/constants'

const emlakJetCrawler = async () => {
  try {
    log.info(EMLAKJET_COMPANY_NAME, 'started cron...')

    const advertLinks = await getAllLinksOfAdvert()
    await Promise.all(
      advertLinks.map(async link => {
        if (!(await advertService.existAdvertByLink(link))) {
          const allItemsOnAdvert = await getInfosOnAdvert(link)
          if (isNullAllItemsOnAdvert(allItemsOnAdvert)) throw new SiteStructureChanged(EMLAKJET_COMPANY_NAME)

          await advertService.saveAdvert(convertToLowerCase(allItemsOnAdvert))
        }
      })
    )

    log.info(EMLAKJET_COMPANY_NAME, `total advert link:${advertLinks.length}`)
    log.info(EMLAKJET_COMPANY_NAME, 'finished cron...')
  } catch (err: any) {
    log.error(EMLAKJET_COMPANY_NAME, err.message)
  }
}

export default emlakJetCrawler

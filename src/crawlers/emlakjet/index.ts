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

    const test = await getInfosOnAdvert('/ilan/tekirdag-cerkezkoy-kizilpinar-namik-kemal-mahallesi-satilik-31-12560016/')
    console.log('test', test)

    return
    const advertLinks = await getAllLinksOfAdvert()
    await Promise.all(
      advertLinks.map(async link => {
        if (!(await advertService.existAdvertByLink(link))) {
          const allItemsOnAdvert = await getInfosOnAdvert(link)
          if (isNullAllItemsOnAdvert(allItemsOnAdvert)) throw new SiteStructureChanged(EMLAKJET_COMPANY_NAME)

          console.log('allItemsOnAdvert', allItemsOnAdvert)

          //  await advertService.saveAdvert(convertToLowerCase(allItemsOnAdvert))
        }
      })
    )
  } catch (err) {}
}

export default emlakJetCrawler

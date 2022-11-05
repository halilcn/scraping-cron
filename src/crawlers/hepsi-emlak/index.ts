import { exit } from 'process'
import advertService from '../../actions/advertService'
import { SiteStructureChanged } from '../../utils/errors'
import { isNullAllItemsOnAdvert } from '../../utils/helpers'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hepsiEmlakCrawler = async () => {
  try {
    const advertLinks = await getAllLinksOfAdvert()
    await Promise.all(
      advertLinks.map(async link => {
        if (!(await advertService.existAdvertByLink(link))) {
          const allItemsOnAdvert = await getInfosOnAdvert(link)
          if (isNullAllItemsOnAdvert(allItemsOnAdvert)) throw new SiteStructureChanged()

          await advertService.saveAdvert(allItemsOnAdvert)
          console.log('hepsiemlak saved !')
        }
      })
    )
  } catch (err: any) {
    console.log(err.message)
  }
}

export default hepsiEmlakCrawler

import advertService from '../actions/advertService'
import { IAdvert } from '../types'
import { SiteStructureChanged } from '../utils/errors'
import { convertToLowerCase, isNullAllItemsOnAdvert } from '../utils/helpers'

const handleAdvertLinks = async (advertLinks: string[], getInfosOnAdvert: (link: string) => Promise<IAdvert>, companyName: string) => {
  await Promise.all(
    advertLinks.map(async link => {
      if (!(await advertService.existAdvertByLink(link))) {
        const allItemsOnAdvert = await getInfosOnAdvert(link)
        if (isNullAllItemsOnAdvert(allItemsOnAdvert)) throw new SiteStructureChanged(companyName)

        await advertService.saveAdvert(convertToLowerCase(allItemsOnAdvert))
      }
    })
  )
}

export default handleAdvertLinks

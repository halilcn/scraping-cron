import advertService from '../actions/advertService'
import { IAdvert } from '../types'
import { SiteStructureChanged } from '../utils/errors'
import { convertToLowerCase, isNullAllItemsOnAdvert } from '../utils/helpers'

const handleAdvertLinks = async (advertLinks: string[], getInfosOnAdvert: (link: string) => Promise<IAdvert>, companyName: string) => {
  const advertList: any = await Promise.all(
    advertLinks.map(async link => {
      if (await advertService.existAdvertByLink(link)) return null

      const allItemsOnAdvert = await getInfosOnAdvert(link)
      if (isNullAllItemsOnAdvert(allItemsOnAdvert)) throw new SiteStructureChanged(companyName)

      const convertedItemsOnAdvert = convertToLowerCase(allItemsOnAdvert)
      await advertService.saveAdvert(convertedItemsOnAdvert)

      return convertedItemsOnAdvert
    })
  ).then(adverts => adverts.filter(advert => advert !== null))

  return advertList
}

export default handleAdvertLinks

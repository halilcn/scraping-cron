import { load } from 'cheerio'
import { IAdvert } from '../../../types'
import getPage from '../../../utils/getPage'
import { convertToNullIfNoData, onlyNumbersFromString } from '../../../utils/helpers'
import { HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE, HEPSIEMLAK_COMPANY_NAME, HEPSIEMLAK_URL } from '../utils/constants'
import elementClasses from '../utils/element-classes'

const getInfosOnAdvert = async (advertLink: string): Promise<IAdvert> => {
  const advert: IAdvert = {
    advertId: null,
    status: null,
    room: null,
    squareMetres: null,
    buildingAge: null,
    price: null,
    city: null,
    district: null,
    currentFloor: null,
    furnitureStatus: null,
    company: HEPSIEMLAK_COMPANY_NAME,
    link: advertLink,
  }

  const page = await getPage(`${HEPSIEMLAK_URL}${advertLink}`)
  const $ = load(page)

  advert.price = parseInt(onlyNumbersFromString($(elementClasses.price).text().trim()))
  advert.city = $(elementClasses.city).text().trim()
  advert.district = $(elementClasses.district).text().trim()

  $(elementClasses.otherInfosBlock).each((_, el) => {
    const advertInfoTitle = $(el).children(elementClasses.otherInfoTitle).text().trim()
    const advertInfoValue = $(el).children(elementClasses.otherInfoValue).text().trim()

    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.advertId) advert.advertId = advertInfoValue
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.status) advert.status = advertInfoValue
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.room) advert.room = advertInfoValue
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.squareMetres) advert.squareMetres = parseInt(advertInfoValue.split(' ')[1])
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.buildingAge) advert.buildingAge = parseInt(advertInfoValue.split(' ')[0])
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.currentFloor) advert.currentFloor = parseInt(advertInfoValue.split(' ')[0])
    if (advertInfoTitle == HEPSIEMLAK_ADVERT_INFO_TITLES_FOR_SCRAPE.furnitureStatus) advert.furnitureStatus = advertInfoValue
  })

  return convertToNullIfNoData(advert)
}

export default getInfosOnAdvert
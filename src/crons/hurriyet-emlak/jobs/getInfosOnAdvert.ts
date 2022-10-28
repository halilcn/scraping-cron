import { load } from 'cheerio'
import { IAdvert } from '../../../types'
import getPage from '../../../utils/getPage'
import { onlyNumbersFromString } from '../../../utils/helpers'
import { ADVERT_INFO_TITLES_FOR_SCRAPE, HURRIYET_EMLAK_URL } from '../utils/constants'
import elementClasses from '../utils/element-classes'

const getInfosOnAdvert = async (advertLink: string): Promise<IAdvert> => {
  const advert: IAdvert = {
    advertId: '',
    status: '',
    room: '',
    squareMetres: 0,
    buildingAge: 0,
    price: 0,
    city: '',
    district: '',
    currentFloor: 0,
    furnitureStatus: '',
  }

  const page = await getPage(`${HURRIYET_EMLAK_URL}${advertLink}`)
  const $ = load(page)

  advert.price = parseInt(onlyNumbersFromString($(elementClasses.price).text().trim())) ?? 0
  advert.city = $(elementClasses.city).text().trim()
  advert.district = $(elementClasses.district).text().trim()

  $(elementClasses.otherInfosBlock).each((_, el) => {
    const advertInfoTitle = $(el).children(elementClasses.otherInfoTitle).text().trim()
    const advertInfoValue = $(el).children(elementClasses.otherInfoValue).text().trim()

    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.advertId) advert.advertId = advertInfoValue
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.status) advert.status = advertInfoValue
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.room) advert.room = advertInfoValue
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.squareMetres) advert.squareMetres = parseInt(advertInfoValue.split(' ')[1])
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.buildingAge) advert.buildingAge = parseInt(advertInfoValue.split(' ')[0]) ?? null
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.currentFloor) advert.currentFloor = parseInt(advertInfoValue.split(' ')[0])
    if (advertInfoTitle == ADVERT_INFO_TITLES_FOR_SCRAPE.furnitureStatus) advert.furnitureStatus = advertInfoValue
  })

  return advert
}

export default getInfosOnAdvert

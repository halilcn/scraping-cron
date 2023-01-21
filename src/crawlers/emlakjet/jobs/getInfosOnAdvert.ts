import { load } from 'cheerio'
import { IAdvertInfoHandler } from '../../../types'
import getPage from '../../../utils/getPage'
import { getDefaultAdvertInfo, onlyNumbersFromString } from '../../../utils/helpers'
import { EMLAKJET_URL, EMLAKJET_COMPANY_NAME, EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE } from '../utils/constants'
import elementClasses from '../utils/elementClasses'

const FURNITURE_STATUS: any = {
  Boş: 'eşyalı değil',
  Eşyalı: 'eşyalı',
}

const getInfosOnAdvert: IAdvertInfoHandler = async advertLink => {
  const advert = getDefaultAdvertInfo(EMLAKJET_COMPANY_NAME, advertLink)

  const page = await getPage(`${EMLAKJET_URL}${advertLink}`)
  const $ = load(page)

  advert.price = parseInt(onlyNumbersFromString($(elementClasses.price).text().trim()))

  const splittedAddress = $(elementClasses.address).text().trim().split('-')
  advert.city = splittedAddress[0].trim()
  advert.district = splittedAddress[1].trim()

  $(elementClasses.otherInfosBlock).each((_, el) => {
    const advertInfoTitle = $(el).children(elementClasses.otherInfoTitle).text().trim()
    const advertInfoValue = $(el).children(elementClasses.otherInfoValue).text().trim()

    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.advertId) advert.advertId = advertInfoValue
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.status) advert.status = advertInfoValue
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.room) advert.room = advertInfoValue.split('').join(' ')
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.squareMetres) advert.squareMetres = parseInt(advertInfoValue.split(' ')[0])
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.buildingAge) advert.buildingAge = parseInt(advertInfoValue.split(' ')[0])
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.currentFloor) advert.currentFloor = parseInt(advertInfoValue.split('.')[0]) || null
    if (advertInfoTitle == EMLAKJET_ADVERT_INFO_TITLES_FOR_SCRAPE.furnitureStatus) advert.furnitureStatus = FURNITURE_STATUS[advertInfoValue]
  })

  return advert
}

export default getInfosOnAdvert

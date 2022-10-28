import { load } from 'cheerio'
import { IAdvert } from '../../../types'
import getPage from '../../../utils/getPage'
import { onlyNumbersFromString } from '../../../utils/helpers'
import { HURRIYET_EMLAK_URL } from '../utils/constants'

enum AdverInfo {
  advertId = 'İlan no',
  status = 'İlan Durumu',
  room = 'Oda + Salon Sayısı',
  squareMetres = 'Brüt / Net M2',
  buildingAge = 'Bina Yaşı',
  currentFloor = 'Bulunduğu Kat',
  furnitureStatus = 'Eşya Durumu',
}

const getInfosOnAdvert = async (advertLink: string) => {
  const advertInfo: IAdvert = {
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

  advertInfo.price = parseInt(onlyNumbersFromString($('.det-title-upper .price').text().trim())) ?? 0
  advertInfo.city = $('.short-info-list > li:nth-child(1)').text().trim()
  advertInfo.district = $('.short-info-list > li:nth-child(2)').text().trim()

  $('.spec-item').each((i, el) => {
    const advertInfoTitle = $(el).children('span:first-child').text().trim()
    const advertInfoValue = $(el).children('span:last-child').text().trim()

    if (advertInfoTitle == AdverInfo.advertId) advertInfo.advertId = advertInfoValue
    if (advertInfoTitle == AdverInfo.status) advertInfo.status = advertInfoValue
    if (advertInfoTitle == AdverInfo.room) advertInfo.room = advertInfoValue
    if (advertInfoTitle == AdverInfo.squareMetres) {
      advertInfo.squareMetres = parseInt(advertInfoValue.split(' ')[1])
    }
    if (advertInfoTitle == AdverInfo.buildingAge) {
      advertInfo.buildingAge = parseInt(advertInfoValue.split(' ')[0])
    }
    if (advertInfoTitle == AdverInfo.currentFloor) {
      advertInfo.currentFloor = parseInt(advertInfoValue.split(' ')[0])
    }
    if (advertInfoTitle == AdverInfo.furnitureStatus) {
      advertInfo.furnitureStatus = advertInfoValue
    }
  })

  return advertInfo
}

export default getInfosOnAdvert

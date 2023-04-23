import { EMLAKJET_COMPANY_NAME, EMLAKJET_URL } from '../crawlers/emlakjet/utils/constants'
import { HEPSIEMLAK_COMPANY_NAME, HEPSIEMLAK_URL } from '../crawlers/hepsiemlak/utils/constants'
import { IAdvert } from '../types'

export const onlyNumbersFromString = (text: string) => {
  return text.replace(/\D/g, '')
}

export const convertToNullIfNoData = (payload: IAdvert) => {
  const advert = payload

  Object.keys(advert).forEach(advertKey => {
    const advertInfoValue = advert[advertKey as keyof IAdvert]

    if (typeof advertInfoValue === 'string' && advertInfoValue !== '') return
    if (typeof advertInfoValue === 'number' && !isNaN(advertInfoValue)) return

    advert[advertKey as keyof IAdvert] = null
  })

  return advert
}

export const isNullAllItemsOnAdvert = (payload: IAdvert) => {
  return Object.values(payload).every(item => item == null)
}

export const convertToLowerCase = (payload: IAdvert) => {
  const advert = payload

  Object.keys(advert).forEach(advertKey => {
    const advertInfoValue: any = advert[advertKey as keyof IAdvert]

    if (typeof advertInfoValue === 'number') return
    if (advertInfoValue === null) return

    advert[advertKey as keyof IAdvert] = advertInfoValue.toLowerCase()
  })

  return advert
}

export const getDefaultAdvertInfo = (company: string, link: string): IAdvert => ({
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
  company,
  link,
})

export const getHostLinkByCompanyName = (companyName: string) => {
  if (companyName === EMLAKJET_COMPANY_NAME) return EMLAKJET_URL
  if (companyName === HEPSIEMLAK_COMPANY_NAME) return HEPSIEMLAK_URL

  return ''
}

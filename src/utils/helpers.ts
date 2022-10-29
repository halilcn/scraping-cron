import { IAdvert } from '../types'

export const onlyNumbersFromString = (text: string) => {
  return text.replace(/\D/g, '')
}

export const convertToNullIfNoData = (payload: IAdvert) => {
  const advert = payload

  Object.keys(advert).map(advertKey => {
    const advertInfoValue = advert[advertKey as keyof IAdvert]

    if (typeof advertInfoValue === 'string' && advertInfoValue !== '') return
    if (typeof advertInfoValue === 'number' && !isNaN(advertInfoValue)) return

    advert[advertKey as keyof IAdvert] = null
  })

  return advert
}

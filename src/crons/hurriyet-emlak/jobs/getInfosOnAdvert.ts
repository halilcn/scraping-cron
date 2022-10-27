import { load } from 'cheerio'
import getPage from '../../../utils/getPage'
import { onlyNumbersFromString } from '../../../utils/helpers'
import { HURRIYET_EMLAK_URL } from '../utils/constants'

const getInfosOnAdvert = async (advertLink: string) => {
  const page = await getPage(`${HURRIYET_EMLAK_URL}${advertLink}`)
  const $ = load(page)

  const price = onlyNumbersFromString($('.det-title-upper .price').text().trim())
  const city = $('.short-info-list > li:nth-child(1)').text().trim()
  const district = $('.short-info-list > li:nth-child(2)').text().trim()

  return { price, city, district }
}

export default getInfosOnAdvert

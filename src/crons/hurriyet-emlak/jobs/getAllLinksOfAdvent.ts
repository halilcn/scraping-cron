import { Element, load } from 'cheerio'
import axios from 'axios'
import elementClasses from '../utils/element-classes'
import { HURRIYET_EMLAK_RENT_PAGE_ADVENT_LINKS } from '../utils/constants'
import getPage from '../../../utils/getPage'

const getAllLinksOfAdvert = async () => {
  const allAdventLinks: string[] = []

  await Promise.all(
    HURRIYET_EMLAK_RENT_PAGE_ADVENT_LINKS.map(async pageLink => {
      const page = await getPage(pageLink)
      const $ = load(page)

      $('.img-link').each((_: number, element: Element) => {
        allAdventLinks.push(element.attribs.href)
      })
    })
  )

  return allAdventLinks
}

export default getAllLinksOfAdvert

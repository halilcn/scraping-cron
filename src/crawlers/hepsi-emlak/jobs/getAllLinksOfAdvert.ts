import { Element, load } from 'cheerio'
import axios from 'axios'
import elementClasses from '../utils/element-classes'
import { HEPSIEMLAK_ADVERT_LINKS } from '../utils/constants'
import getPage from '../../../utils/getPage'

const getAllLinksOfAdvert = async () => {
  const allAdventLinks: string[] = []

  await Promise.all(
    HEPSIEMLAK_ADVERT_LINKS.map(async pageLink => {
      const page = await getPage(pageLink)
      const $ = load(page)

      $(elementClasses.advertLink).each((_: number, element: Element) => {
        allAdventLinks.push(element.attribs.href)
      })
    })
  )

  return allAdventLinks
}

export default getAllLinksOfAdvert

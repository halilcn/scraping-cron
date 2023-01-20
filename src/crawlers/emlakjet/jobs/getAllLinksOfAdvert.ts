import { Element, load } from 'cheerio'
import getPage from '../../../utils/getPage'
import { EMLAKJET_ADVERT_LINKS } from '../utils/constants'
import elementClasses from '../utils/elementClasses'

const getAllLinksOfAdvert = async (): Promise<string[]> => {
  const allAdvertLinks = await Promise.all(
    EMLAKJET_ADVERT_LINKS.map(async pageLink => {
      const page = await getPage(pageLink)
      const $ = load(page)

      const links: string[] = []
      $(elementClasses.advertLink).each((_: number, element: Element) => {
        links.push(element.attribs.href)
      })

      return links
    })
  )

  return allAdvertLinks.flat(1)
}

export default getAllLinksOfAdvert

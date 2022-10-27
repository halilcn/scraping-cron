import cheerio, { Element, load } from 'cheerio'
import axios from 'axios'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvent'

const hurriyetEmlakCron = async () => {
  const advertLinks = await getAllLinksOfAdvert()

  console.log(advertLinks)
}

export default hurriyetEmlakCron

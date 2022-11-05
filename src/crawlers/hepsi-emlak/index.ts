import advertService from '../../actions/advertService'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hepsiEmlakCrawler = async () => {
  // TODO: dış try catch ?
  const advertLinks = await getAllLinksOfAdvert()

  await Promise.all(
    advertLinks.map(async link => {
      try {
        const allItemsOnAdvert = await getInfosOnAdvert(link)
        await advertService.saveAdvert(allItemsOnAdvert)
        console.log('saved !')
      } catch (err: any) {
        console.log('kardeş hata var')
        console.log(err.message)
      }
    })
  )

  /**/
}

export default hepsiEmlakCrawler

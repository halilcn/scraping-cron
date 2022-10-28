import advertService from '../../actions/advertService'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hurriyetEmlakCron = async () => {
  const advertLinks = await getAllLinksOfAdvert()

  await Promise.all(
    advertLinks.map(async link => {
      try {
        const allItemsOnAdvert = await getInfosOnAdvert(link)
        await advertService.saveAdvert(allItemsOnAdvert)
      } catch (err: any) {
        console.log('error var.')
      }
    })
  )
}

export default hurriyetEmlakCron

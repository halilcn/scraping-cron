import advertService from '../../actions/advertService'
import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hurriyetEmlakCron = async () => {
  // const advertLinks = await getAllLinksOfAdvert()

  try {
    const allItemsOnAdvert = await getInfosOnAdvert('/ankara-mamak-durali-alic-kiralik/daire/126040-132')
  } catch (err: any) {
    console.log('kardeş hata var')
    console.log(err.message)
  }

  /*await Promise.all(
    advertLinks.map(async link => {
      try {
        const allItemsOnAdvert = await getInfosOnAdvert(link)

        //await advertService.saveAdvert(allItemsOnAdvert)
      } catch (err: any) {
        console.log('error var.')
        console.log(err)
      }
    })
  )*/
}

export default hurriyetEmlakCron

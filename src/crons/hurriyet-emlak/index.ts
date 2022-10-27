import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvent'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hurriyetEmlakCron = async () => {
  const advertLinks = await getAllLinksOfAdvert()
  const allItemsOnAdvert = await getInfosOnAdvert('/ankara-yenimahalle-ata-kiralik/daire/30002-8131')

  console.log(allItemsOnAdvert)
}

export default hurriyetEmlakCron

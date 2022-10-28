import getAllLinksOfAdvert from './jobs/getAllLinksOfAdvert'
import getInfosOnAdvert from './jobs/getInfosOnAdvert'

const hurriyetEmlakCron = async () => {
  const advertLinks = await getAllLinksOfAdvert()
  const allItemsOnAdvert = await getInfosOnAdvert('/ankara-sincan-29-ekim-satilik/daire/133111-3')

  //saveblabla(datas)
  console.log(allItemsOnAdvert)
}

export default hurriyetEmlakCron

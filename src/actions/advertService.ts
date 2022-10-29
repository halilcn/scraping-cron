import Advert from '../models/advert'
import { IAdvert } from '../types'

const saveAdvert = async (payload: IAdvert) => {
  try {
    if (await Advert.exists({ advertId: payload.advertId })) return
    await Advert.create(payload)
  } catch (err: any) {
    console.log('hata var mongoose')
    console.log(err)
  }
}

export default { saveAdvert }

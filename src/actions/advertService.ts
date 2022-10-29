import Advert from '../models/advert'
import { IAdvert } from '../types'

const saveAdvert = async (payload: IAdvert) => {
  if (await Advert.exists({ advertId: payload.advertId })) return
  await Advert.create(payload)
}

export default { saveAdvert }

import Advert from '../models/advert'
import { IAdvert } from '../types'
import { DatabaseSaveError } from '../utils/errors'

const saveAdvert = async (payload: IAdvert) => {
  try {
    if (await Advert.exists({ advertId: payload.advertId })) return
    await Advert.create(payload)
  } catch (err: any) {
    throw new DatabaseSaveError(err)
  }
}

export default { saveAdvert }

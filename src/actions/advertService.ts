import Advert from '../models/advert'
import { IAdvert } from '../types'
import { DatabaseSaveError } from '../utils/errors'

const saveAdvert = async (payload: IAdvert) => {
  try {
    const existedAdvert = await Advert.exists({ advertId: payload.advertId })
    if (existedAdvert) {
      await Advert.findOneAndUpdate({ advertId: payload.advertId }, payload)
      return
    }
    await Advert.create(payload)
  } catch (err: any) {
    throw new DatabaseSaveError(err)
  }
}

const existAdvertByLink = async (link: string): Promise<boolean> => {
  try {
    return !!(await Advert.exists({ link }))
  } catch (err: any) {
    throw new DatabaseSaveError(err)
  }
}

export default { saveAdvert, existAdvertByLink }

import User from '../models/user'
import { IAdvert } from '../types'
import compileEmail from '../utils/compileEmail'
import { getHostLinkByCompanyName } from '../utils/helpers'
import sendEmail from '../utils/sendEmail'

const alarmEmail = async (notification: any, allAdverts: IAdvert[]) => {
  const filters = notification.params

  //TODO: If we can get rid of if/else, it would be better
  const adverts = allAdverts
    .filter((advert: IAdvert) => {
      if (filters.maxPrice && filters.minPrice && advert.price && (advert.price < filters.minPrice || advert.price > filters.maxPrice)) return false
      if (
        filters.maxSquareMetres &&
        filters.minSquareMetres &&
        advert.squareMetres &&
        (advert.squareMetres < filters.minSquareMetres || advert.squareMetres > filters.maxSquareMetres)
      )
        return false
      if (filters.status && advert.status && filters.status !== advert.status) return false
      if (filters.city && advert.city && advert.city !== filters.city) return false
      if (filters.room && advert.room && advert.room !== filters.room) return false
      if (filters.district && advert.district && advert.district !== filters.district) return false

      return true
    })
    .map(advert => `${getHostLinkByCompanyName(advert.company || '')}${advert.link}`)

  if (adverts.length === 0) return

  const compiledEmail = compileEmail('advert-alarm', { adverts })
  const user = await User.findOne({ _id: notification.userId })

  if (!user) return

  sendEmail({
    to: user.email,
    subject: 'İlan Alarm',
    html: compiledEmail,
  })
}

export default alarmEmail

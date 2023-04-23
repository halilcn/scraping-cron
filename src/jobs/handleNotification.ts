import { NOTIFICATION } from '../constants'
import Notification from '../models/notification'
import alarmEmail from '../notifications/alarmEmail'
import { IAdvert } from '../types'

const handleNotification = async (advertList: IAdvert[]) => {
  const notifications = await Notification.find({})

  notifications.forEach(notification => {
    if (notification.type === NOTIFICATION.ALARM_EMAIL) alarmEmail(notification, advertList)
  })
}

export default handleNotification

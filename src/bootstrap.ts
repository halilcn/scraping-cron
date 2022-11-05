import mongoose from 'mongoose'
import log from 'npmlog'

require('dotenv').config()

mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => {
    log.info('general', 'Connected to mongoDB')
  })
  .catch(err => {
    log.error('general', 'Mongoose connect error:' + err)
    process.exit(1)
  })

import mongoose from 'mongoose'

require('dotenv').config()

//process.env.MONGO_DB_URI as string
mongoose
  .connect('mongodb://localhost:27017/scrap')
  .then(() => {
    console.log('Connected to mongoDB')
  })
  .catch(err => {
    console.log('Mongoose connect error:' + err)
    process.exit(1)
  })

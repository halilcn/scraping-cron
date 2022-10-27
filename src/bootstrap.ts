import mongoose from 'mongoose'

require('dotenv').config()

console.log('içerde !!')

//process.env.MONGO_DB_URI as string
mongoose
  .connect('mongodb://db:27017')
  .then(() => {
    console.log('Connected to mongoDB')
  })
  .catch(err => {
    console.log('Mongoose connect error:' + err)
    process.exit(1)
  })

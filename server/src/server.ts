import express from 'express'
import payload from 'payload'
import TelegramService from './services/telegram.service'
import CurrencyService from './services/currency.service'
import CMCService from './services/cmc.service'

require('dotenv').config()
const app = express()

app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      new TelegramService()
      new CurrencyService()
    },
  })

  app.listen(process.env.PORT)
}

start()

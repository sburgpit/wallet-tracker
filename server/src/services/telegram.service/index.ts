import payload from 'payload'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

class TelegramService {
  bot: Telegraf
  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
    this.init()
  }

  private async init() {
    this.bot.start((ctx) => ctx.reply('Welcome'))
    this.bot.on(message('text'), (ctx) => ctx.reply('Hello'))
    this.bot.launch()
  }
}

export default TelegramService

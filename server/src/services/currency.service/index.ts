import fs from 'fs'

class CurrencyService {
  apiKey = process.env.EXCHANGE_RATE_API_KEY
  baseUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}`
  constructor() {}

  async getCodes() {
    const result = await fetch(`${this.baseUrl}/codes`)
    const json = await result.json()
    fs.writeFileSync('currencies.json', JSON.stringify(json))
    console.log(json)
  }
}

export default CurrencyService

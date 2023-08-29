import fs from 'fs'

class CMCService {
  constructor() {}

  async getFiatData() {
    const response = await fetch(`${process.env.CMC_PRO_API_URL}/v1/fiat/map`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
      },
    })
    const json = await response.json()
    console.log(json)
    fs.writeFileSync('crypto-currencies.json', JSON.stringify(json))
    return json
  }

  async getCryptoData(symbols: string[]) {
    // const response = await fetch(`${process.env.CMC_PRO_API_URL}/v2/cryptocurrency/info?symbol=${symbols.join(',')}&aux=logo`, {
    //   headers: {
    //     'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
    //   },
    // })
    // const json = await response.json()
    // console.log(json)
    // fs.writeFileSync('crypto-currencies.json', JSON.stringify(json))
    // return json
  }
}

export default CMCService

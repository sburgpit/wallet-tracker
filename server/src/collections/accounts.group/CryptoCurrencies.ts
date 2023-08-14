import { CollectionConfig } from 'payload/types'

const CryptoCurrencies: CollectionConfig = {
  slug: 'crypto_currencies',
  labels: {
    singular: 'Cryptos',
    plural: 'Crypto',
  },
  admin: {
    group: 'Accounts',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'id',
      label: 'Symbol',
      required: true,
      index: true,
    },
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    { type: 'text', name: 'logoUrl' },
    { type: 'number', name: 'cmcID', required: true, label: 'CMC ID' },
    {
      type: 'number',
      name: 'rateToUSD',
      label: 'Rate to USD',
      defaultValue: 0,
      required: true,
    },
  ],
}

export default CryptoCurrencies

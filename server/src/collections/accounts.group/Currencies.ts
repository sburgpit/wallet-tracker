import { CollectionConfig } from 'payload/types'

const Currencies: CollectionConfig = {
  slug: 'currencies',
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
      name: 'fullName',
      required: true,
    },
    {
      type: 'text',
      name: 'sign',
      required: true,
    },
    {
      type: 'number',
      name: 'rateToUSD',
      label: 'Rate to USD',
      defaultValue: 0,
      required: true,
    },
  ],
}

export default Currencies

import { owner } from '../../fields/owner'
import { CollectionConfig, Field } from 'payload/types'
import {
  updateUserRelationshipFieldAfterChange,
  updateUserRelationshipFieldAfterDelete,
} from '../../hooks/updateUserRelationshipFields'

const type: Field = {
  type: 'select',
  name: 'type',
  options: ['Card', 'Account', 'Crypto', 'Cash'],
  required: true,
}
const name: Field = { type: 'text', name: 'name', required: true }
const balance: Field = { type: 'number', name: 'balance', required: true, defaultValue: 0 }
const bank: Field = {
  type: 'relationship',
  relationTo: 'banks',
  name: 'bank',
}
const currency: Field = {
  type: 'relationship',
  relationTo: 'currencies',
  name: 'currency',
  required: true,
  admin: {
    condition: (_, siblingData) => siblingData?.type !== 'Crypto',
  },
}
const cryptoCurrency: Field = {
  type: 'relationship',
  relationTo: 'crypto_currencies',
  name: 'cryptoCurrency',
  required: true,
  admin: {
    condition: (_, siblingData) => siblingData?.type === 'Crypto',
  },
}
const isArchived: Field = { type: 'checkbox', name: 'isArchived', required: true, defaultValue: false }
const includeToBalance: Field = { type: 'checkbox', name: 'includeToBalance', required: true, defaultValue: true }
const isSavings: Field = { type: 'checkbox', name: 'isSavings', required: true, defaultValue: false }

const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    group: 'Accounts',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [updateUserRelationshipFieldAfterChange('accounts')],
    afterDelete: [updateUserRelationshipFieldAfterDelete('accounts')],
  },
  fields: [type, name, balance, bank, currency, cryptoCurrency, isArchived, includeToBalance, isSavings, owner],
}

export default Accounts

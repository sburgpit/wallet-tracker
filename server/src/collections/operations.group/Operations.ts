import { CollectionConfig, Field } from 'payload/types'
import { owner } from '../../fields/owner'
import {
  updateUserRelationshipFieldAfterChange,
  updateUserRelationshipFieldAfterDelete,
} from '../../hooks/updateUserRelationshipFields'

const type: Field = { type: 'select', name: 'type', options: ['Expense', 'Income', 'Debt', 'Transfer'], required: true }
const amount: Field = { type: 'number', name: 'amount', required: true }
const withdrawal: Field = {
  type: 'number',
  name: 'withdrawal',
  required: true,
  admin: {
    condition: (_, siblingData) => siblingData?.type === 'Transfer',
  },
}
const comment: Field = { type: 'text', name: 'comment' }
const category: Field = {
  type: 'relationship',
  relationTo: 'categories',
  name: 'category',
  admin: {
    condition: (_, siblingData) => ['Expense', 'Income'].includes(siblingData?.type),
  },
}
const place: Field = {
  type: 'relationship',
  relationTo: 'places',
  name: 'place',
  admin: {
    condition: (_, siblingData) => siblingData?.type !== 'Transfer',
  },
}
const accountFrom: Field = {
  type: 'relationship',
  relationTo: 'accounts',
  name: 'accountFrom',
  required: true,
  admin: {
    condition: (_, siblingData) => siblingData?.type !== 'Income',
  },
}
const accountTo: Field = {
  type: 'relationship',
  relationTo: 'accounts',
  name: 'accountTo',
  required: true,
  admin: {
    condition: (_, siblingData) => ['Transfer', 'Income'].includes(siblingData?.type),
  },
}
const date: Field = {
  name: 'date',
  type: 'date',
  defaultValue: new Date().toISOString(),
}

const Operations: CollectionConfig = {
  slug: 'operations',
  admin: {
    group: 'Operations',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [updateUserRelationshipFieldAfterChange('operations')],
    afterDelete: [updateUserRelationshipFieldAfterDelete('operations')],
  },
  fields: [type, amount, withdrawal, category, accountFrom, accountTo, place, date, comment, owner],
}

export default Operations

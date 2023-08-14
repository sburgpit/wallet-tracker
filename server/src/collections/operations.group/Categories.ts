import { CollectionConfig } from 'payload/types'
import { owner } from '../../fields/owner'
import {
  updateUserRelationshipFieldAfterChange,
  updateUserRelationshipFieldAfterDelete,
} from '../../hooks/updateUserRelationshipFields'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Operations',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [updateUserRelationshipFieldAfterChange('categories')],
    afterDelete: [updateUserRelationshipFieldAfterDelete('categories')],
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    {
      type: 'relationship',
      relationTo: 'categories',
      name: 'parent',
    },
    {
      type: 'relationship',
      relationTo: 'categories',
      name: 'children',
      hasMany: true,
    },
    {
      type: 'checkbox',
      name: 'isIncome',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'isExpense',
      required: true,
    },
    owner,
  ],
  timestamps: false,
}

export default Categories

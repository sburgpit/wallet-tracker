import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'telegramID',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'select',
      name: 'roles',
      hasMany: true,
      options: ['admin', 'user'],
      defaultValue: 'user',
    },
    {
      type: 'number',
      name: 'telegramID',
      label: 'Telegram ID',
    },
    {
      type: 'relationship',
      relationTo: 'accounts',
      name: 'accounts',
      hasMany: true,
    },
    {
      type: 'relationship',
      relationTo: 'operations',
      name: 'operations',
      hasMany: true,
    },
    {
      type: 'relationship',
      relationTo: 'categories',
      name: 'categories',
      hasMany: true,
    },
    {
      type: 'relationship',
      relationTo: 'places',
      name: 'places',
      hasMany: true,
    },
  ],
}

export default Users

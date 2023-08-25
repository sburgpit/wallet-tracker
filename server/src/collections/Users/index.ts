import { CollectionConfig } from 'payload/types'
import { adminOrMe, anyone } from '../../accesses'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 86400 * 2, // 48 hours
    cookies: {
      sameSite: 'none',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    read: adminOrMe,
    update: adminOrMe,
    delete: adminOrMe,
    create: anyone,
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
      saveToJWT: true,
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

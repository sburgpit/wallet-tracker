import { owner } from '../../fields/owner'
import { CollectionConfig } from 'payload/types'

const Banks: CollectionConfig = {
  slug: 'banks',
  admin: {
    group: 'Accounts',
  },
  access: {
    read: () => true,
  },
  fields: [{ type: 'text', name: 'name' }, owner],
}

export default Banks

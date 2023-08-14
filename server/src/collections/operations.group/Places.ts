import { CollectionConfig } from 'payload/types'
import { owner } from '../../fields/owner'
import {
  updateUserRelationshipFieldAfterChange,
  updateUserRelationshipFieldAfterDelete,
} from '../../hooks/updateUserRelationshipFields'

const Places: CollectionConfig = {
  slug: 'places',
  admin: {
    group: 'Operations',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [updateUserRelationshipFieldAfterChange('places')],
    afterDelete: [updateUserRelationshipFieldAfterDelete('places')],
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    owner,
  ],
  timestamps: false,
}

export default Places

import { RelationshipField } from 'payload/types'

export const owner: RelationshipField = {
  type: 'relationship',
  relationTo: 'users',
  name: 'owner',
  required: true,
  index: true,
}

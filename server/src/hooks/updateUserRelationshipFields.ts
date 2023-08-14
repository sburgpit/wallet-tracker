import { User } from 'payload/generated-types'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types'
import { castToID } from '../utils/castToID'

type UserRelationshipField = keyof Pick<User, 'operations' | 'accounts' | 'categories' | 'places'>

export const updateUserRelationshipFieldAfterChange =
  (fieldName: UserRelationshipField): CollectionAfterChangeHook =>
  async ({ doc, operation, req: { payload } }) => {
    try {
      if (operation === 'update') return

      const ownerID = castToID(doc.owner)
      const user = await payload.findByID({ collection: 'users', id: ownerID, depth: 0 })

      const field = [...(user[fieldName] || [])]
      if (field.includes(doc.id)) return

      await payload.update({
        id: ownerID,
        collection: 'users',
        data: {
          [fieldName]: [doc.id, ...(field as string[])],
        },
      })
    } catch (e) {
      payload.logger.error('Error update user value AFTER CHANGE: ')
      payload.logger.error(e)
    }
  }

export const updateUserRelationshipFieldAfterDelete =
  (fieldName: UserRelationshipField): CollectionAfterDeleteHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const ownerID = castToID(doc.owner)
      const user = await payload.findByID({ collection: 'users', id: ownerID, depth: 0 })

      const field = [...(user[fieldName] || [])]
      if (!field.includes(doc.id)) return

      await payload.update({
        id: ownerID,
        collection: 'users',
        data: {
          [fieldName]: [...(field as string[]).filter((id) => doc.id !== id)],
        },
      })
    } catch (e) {
      payload.logger.error('Error update user value AFTER DELETE: ')
      payload.logger.error(e)
    }
  }

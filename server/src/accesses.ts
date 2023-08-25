import { Access } from 'payload/config'
import type { User } from 'payload/generated-types'

export const user: Access = ({ req: { user } }) => Boolean(user)
export const admin: Access = ({ req: { user } }) => user?.roles?.some((role: User['roles'][number]) => role === 'admin')
export const adminOrMe: Access = (args) => admin(args) || args?.id === args.req.user?.id
export const anyone: Access = () => true

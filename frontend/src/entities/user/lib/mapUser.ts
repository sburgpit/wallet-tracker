import type { UserDTO } from '../api/types'
import type { User } from '../model/types'

export const mapUser = (dto: UserDTO): User => {
  return {
    userID: dto.user.id,
    tokenExpireTimestamp: dto.exp,
  }
}

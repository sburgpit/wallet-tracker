import type { UserDTO } from '../api/types'
import type { User } from '../model/types'

export const mapUser = (dto: UserDTO): User | null => {
  return dto
    ? {
        userID: dto.id,
        email: dto.email,
        telegramID: dto.telegramID,
      }
    : null
}

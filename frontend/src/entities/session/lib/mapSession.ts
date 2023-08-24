import type { SessionDTO } from '../api/types'
import type { Session } from '../model/types'

export const mapSession = (dto: SessionDTO): Session => {
  return {
    tokenExpireTimestamp: dto.exp,
    user: { email: dto.user.email, telegramID: dto.user.telegramID, userID: dto.user.id },
  }
}

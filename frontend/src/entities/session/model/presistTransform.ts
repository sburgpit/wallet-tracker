import { createTransform } from 'redux-persist'
import { sessionSlice } from '..'
import { SessionSliceState } from './sessionSlice'

export const SessionTransform = createTransform<SessionSliceState, Omit<SessionSliceState, 'isInited'>>(
  (inboundState) => {
    const { ...stateToPersist } = inboundState
    return stateToPersist
  },

  (outboundState) => {
    return {
      ...outboundState,
      isAuth: outboundState.isAuth as false,
    }
  },
  { whitelist: [sessionSlice.name] }
)

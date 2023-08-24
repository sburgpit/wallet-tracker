import { createTransform } from 'redux-persist'
import { sessionSlice } from '..'
import { SessionSliceState } from './sessionSlice'

export const SessionTransform = createTransform<SessionSliceState, Omit<SessionSliceState, 'isInited'>>(
  (inboundState) => {
    // eslint-disable-next-line
    const { isInited, ...stateToPersist } = inboundState
    return stateToPersist
  },

  (outboundState) => {
    return {
      ...outboundState,
      isAuth: outboundState.isAuth as false,
      isInited: false,
    }
  },
  { whitelist: [sessionSlice.name] }
)

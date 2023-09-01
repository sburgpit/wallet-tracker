import type { RootState } from 'app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalData } from './types'

export type ModalSliceState = {
  isShown: boolean
  data: ModalData | null
}

const initialState: ModalSliceState = {
  isShown: false,
  data: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isShown = payload
    },
    setModalData: (state, { payload }: PayloadAction<ModalData>) => {
      state.data = payload
    },
    setDataAndShowModal: (state, { payload }: PayloadAction<ModalSliceState>) => {
      state.data = payload.data
      state.isShown = payload.isShown
    },
  },
})

export const selectIsModalShown = (state: RootState) => state.modal.isShown

export const { showModal, setModalData, setDataAndShowModal } = modalSlice.actions

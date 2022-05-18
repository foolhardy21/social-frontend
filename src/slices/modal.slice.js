import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: '',
    type: '',
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        resetModal: (state) => {
            state.type = ''
            state.id = ''
        },
        setModal: (state, action) => {
            state.type = action.payload.type
            state.id = action.payload.id
        }
    }
})

export const { resetModal, setModal } = modalSlice.actions

export const modalReducer = modalSlice.reducer
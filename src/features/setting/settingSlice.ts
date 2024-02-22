// slice for settings specific operations
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingState {
    settingActive: boolean
}

const initialState: SettingState = {
    settingActive: false
}

export const settingSlice = createSlice({
    name: 'settingpanel',
    initialState,
    reducers: {
        // stores if the setting textarea is selected or not
        setSettingActive: (state, action: PayloadAction<boolean>) => {
            state.settingActive = action.payload
        }
    }
})

export const { setSettingActive } = settingSlice.actions;
export default settingSlice.reducer
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

export interface IRootState {
  language: string;
  token: string;
  accountInformation: any;
}

const initialState: IRootState = {
  language: 'en',
  token: '',
  accountInformation: null,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccountInformation: (state, action) => {
      state.accountInformation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLanguage, setToken, setAccountInformation } = rootSlice.actions;

export const rootSelector = (state: RootState) => state.root;

export default rootSlice.reducer;

import { facebookRequest } from '@/app/api';
import { FacebookModel } from '@/app/api/requests';
import { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IPartnerState {
  loadingFacebooks: boolean;
  facebooks?: FacebookModel[];
}

const initialState: IPartnerState = {
  loadingFacebooks: false,
  facebooks: undefined,
};

export const getFacebooksAysnc = createAsyncThunk('/facebook', async () => {
  const response = await facebookRequest.getFacebooks(undefined);
  return response;
});

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFacebooksAysnc.pending, state => {
        state.loadingFacebooks = true;
      })
      .addCase(getFacebooksAysnc.fulfilled, (state, action) => {
        state.loadingFacebooks = false;
        state.facebooks = action.payload?.facebookList;
      })
      .addCase(getFacebooksAysnc.rejected, state => {
        state.loadingFacebooks = false;
        state.facebooks = undefined;
      });
  },
});

export const partnerActions = partnerSlice.actions;

export const partnerSelector = (state: RootState) => state.partner;

export default partnerSlice.reducer;

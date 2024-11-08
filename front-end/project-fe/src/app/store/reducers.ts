import partnerSlice from '@/features/system/store/partnerSlice';
import rootSlice from '@/features/system/store/storeSlice';
import { combineReducers, Reducer } from 'redux';

const appReducer = combineReducers({
  root: rootSlice,
  partner: partnerSlice,
});

export const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

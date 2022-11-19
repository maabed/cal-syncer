/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from '@/redux/store';

interface IInitialState {
  token: string | null | undefined;
}

const initialState: IInitialState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentToken: (state, action: PayloadAction<IInitialState['token']>) => {
      state.token = action.payload;
    },
  },
});

export const { setCurrentToken } = authSlice.actions;

export const selectCurrentToken = (state: AppState) => state.auth.token;

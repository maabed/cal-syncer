/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '@/redux/services/users';
import type { AppState } from '@/redux/store';
import type { IUserApiResponse } from '@/types/ApiResponse';

const setUsersReducer = (state: IInitialState, action: PayloadAction<IInitialState['result']>) => {
  state.result = action.payload;
};
interface IInitialState {
  result: IUserApiResponse;
}

const initialState: IInitialState = {
  result: {
    users: [],
    totalCount: 0,
    count: 0,
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: setUsersReducer,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUsers.matchPending, (_state, _action) => {
        // console.log("me pending", action);
      })
      .addMatcher(usersApi.endpoints.getUsers.matchFulfilled, setUsersReducer)
      .addMatcher(usersApi.endpoints.getUsers.matchRejected, (_state, _action) => {
        // console.log("me rejected", action);
      });
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state: AppState) => state.users.result;

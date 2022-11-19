/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { meetingsApi } from '@/redux/services/meetings';
import type { AppState } from '@/redux/store';
import type { IMeetingApiResponse } from '@/types/ApiResponse';

const setMeetingsReducer = (state: IInitialState, action: PayloadAction<IInitialState['result']>) => {
  state.result = action.payload;
};
interface IInitialState {
  result: IMeetingApiResponse;
}

const initialState: IInitialState = {
  result: {
    meetings: [],
    totalCount: 0,
    count: 0,
  },
};

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setMeetings: setMeetingsReducer,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(meetingsApi.endpoints.getMeetings.matchPending, (_state, _action) => {
        // console.log("me pending", action);
      })
      .addMatcher(meetingsApi.endpoints.getMeetings.matchFulfilled, setMeetingsReducer)
      .addMatcher(meetingsApi.endpoints.getMeetings.matchRejected, (_state, _action) => {
        // console.log("me rejected", action);
      });
  },
});

export const { setMeetings } = meetingsSlice.actions;

export const selectMeetings = (state: AppState) => state.meetings.result;

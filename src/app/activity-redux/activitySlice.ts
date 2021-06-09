import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getActivities, filterActivities } from "./activityAPI";

export interface UserActivityData {
  status: "idle" | "loading" | "failed";
  activities: [object?];
}

const initialState: UserActivityData = {
  status: "idle",
  activities: [],
};

export const getUserActivitiesAsync = createAsyncThunk(
  "activites/getUserActivities",
  async () => {
    const response = await getActivities();
    return response;
  }
);

export const filterActivitiesAsync = createAsyncThunk(
  "activites/filterActivities",
  async (date: any) => {
    const response = await filterActivities(date.startDate, date.endDate);
    return response;
  }
);

export const activitySlice = createSlice({
  name: "activites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserActivitiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserActivitiesAsync.fulfilled, (state, action) => {
        if (action.payload?.payload) {
          console.log({ action });
          state.activities = action.payload.payload.data;
        }
        state.status = "idle";
      })
      .addCase(filterActivitiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterActivitiesAsync.fulfilled, (state, action) => {
        if (action.payload?.payload) {
          console.log({ action });
          state.activities = action.payload.payload.data;
        }
        state.status = "idle";
      });
  },
});

export const {} = activitySlice.actions;

export const selectStateValues = (state: RootState) => state.activities;

export default activitySlice.reducer;

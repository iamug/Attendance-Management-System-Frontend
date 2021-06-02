import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getActivities } from "./activityAPI";

export interface UserAuthState {
  status: "idle" | "loading" | "failed";
  userData: UserData;
  isAuthenticated: true | false;
}

export interface UserData {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}

const userStorage = JSON.parse(
  localStorage.getItem("user") as string
) as UserData;

const initialState: UserAuthState = {
  status: "idle",
  userData: userStorage ? userStorage : {},
  isAuthenticated: false || !!localStorage.getItem("user-token"),
};

export const getUserActivitiesAsync = createAsyncThunk(
  "activites/getUserActivities",
  async () => {
    const response = await getActivities();
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserActivitiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserActivitiesAsync.fulfilled, (state, action) => {
        if (action.payload) {
          console.log({ action });
          //state.userData = action.payload.payload.user;
          //   localStorage.setItem("user-token", action.payload.payload.token);
          //   localStorage.setItem(
          //     "user",
          //     JSON.stringify(action.payload.payload.user)
          //   );
        }
        state.isAuthenticated = true;
        state.status = "idle";
      });
  },
});

export const {} = authSlice.actions;

export const selectStateValues = (state: RootState) => state.auth;

export default authSlice.reducer;

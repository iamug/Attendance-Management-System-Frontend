import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginUser, registerUser } from "./authAPI";

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

export const loginAsync = createAsyncThunk(
  "auth/loginUser",
  async (userObj: UserData) => {
    const response = await loginUser(userObj);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerUser",
  async (userObj: UserData) => {
    const response = await registerUser(userObj);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload?.payload) {
          state.userData = action.payload.payload.user;
          localStorage.setItem("user-token", action.payload.payload.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.payload.user)
          );
        }
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        if (action.payload?.payload) {
          state.userData = action.payload.payload.user;
          localStorage.setItem("user-token", action.payload.payload.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.payload.user)
          );
        }

        state.isAuthenticated = true;
        state.status = "idle";
      });
  },
});

export const {} = authSlice.actions;

export const selectStateValues = (state: RootState) => state.auth;

export default authSlice.reducer;

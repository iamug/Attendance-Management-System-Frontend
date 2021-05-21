import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { loginUser, registerUser } from "./authAPI";

export interface UserAuthState {
  status: "idle" | "loading" | "failed";
  userData: object;
  isAuthenticated: true | false
}

interface UserData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

const initialState: UserAuthState = {
  status: "idle",
  userData: {},
  isAuthenticated: false || !!localStorage.getItem('user-token')
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
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if(action.payload?.payload){
          state.userData = action.payload.payload;
          localStorage.setItem('user-token', action.payload.payload.token)
        }
        state.userData = {};
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        if(action.payload?.payload){
          state.userData = action.payload.payload;
          localStorage.setItem('user-token', action.payload.payload.token)
        }
        state.userData = {};
        state.isAuthenticated = true;
        state.status = "idle";
      });
  },
});

export const { } = authSlice.actions;

export const selectStateValues = (state: RootState) => state.auth;

export default authSlice.reducer;

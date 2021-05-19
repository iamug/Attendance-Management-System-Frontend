import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { loginUser, registerUser } from "./authAPI";

export interface UserAuthState {
  status: "idle" | "loading" | "failed";
  userData: object;
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
    increment: (state) => {},
    decrement: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.userData = action.payload.payload;
        state.status = "idle";
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.userData = action.payload.payload;
        state.status = "idle";
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const selectStateValues = (state: RootState) => state.auth;

export default authSlice.reducer;

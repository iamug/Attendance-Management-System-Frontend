import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./auth-redux/authSlice";
import activityReducer from "./activity-redux/activitySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    activities: activityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

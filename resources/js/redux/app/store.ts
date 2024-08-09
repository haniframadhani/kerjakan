import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../features/alertSlice";

const store = configureStore({
    reducer: {
        alert: alertReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

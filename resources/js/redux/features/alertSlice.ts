import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    message?: string | null;
    show: boolean;
};

const initialState: InitialState = {
    message: "",
    show: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        message: (state, action: PayloadAction<string | null | undefined>) => {
            state.message = action.payload;
            if (action.payload) {
                state.show = true;
            }
        },
        turnOff: (state) => {
            state.show = false;
            state.message = "";
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(alertSlice.actions.message, (state) => {
    //         state.show = false;
    //     });
    // },
});

export default alertSlice.reducer;
export const { message, turnOff } = alertSlice.actions;

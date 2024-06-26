import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  userName: string;
  userEmail: string;
  isFieldFocusRegistered: boolean;
}

type UserPayloadObject = {
  name: string;
  email: string;
};

const initialState: MainState = {
  /* User */
  userName: "",
  userEmail: "",

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions;

export default mainSlice.reducer;

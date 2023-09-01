import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginLoading: false
};

export const loadingSlice = createSlice({
  name: "loading",

  initialState,

  reducers: {
    loginAction: (state, action) => {
      state.loginLoading = action.payload;
    }
  }
});
export default loadingSlice.reducer;

// Actions
const { loginAction } = loadingSlice.actions;

export const loginLoading = (data) => async (dispatch) => {
  return dispatch(loginAction(data));
};

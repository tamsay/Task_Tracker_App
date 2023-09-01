import { configureStore } from "@reduxjs/toolkit";

import LoadingReducer from "./Loading/LoadingSlice";
import ModalReducer from "./Modal/ModalSlice";
import TasksSlice from "./Tasks/TasksSlice";

const store = configureStore({
  reducer: {
    modal: ModalReducer,
    loading: LoadingReducer,
    tasks: TasksSlice
  },
  devTools: process.env.NODE_ENV === "development" ? true : false
});

export default store;

import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: {},

  createTaskData: {},
  deleteTaskData: {},
  updateTaskStatusData: {},
  modifyTaskData: {},
  getPendingTasksData: {}
};

export const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    createTaskAction: (state, action) => {
      state.createTaskData = action.payload;
      state.loading = false;
    },

    deleteTaskAction: (state, action) => {
      state.deleteTaskData = action.payload;
      state.loading = false;
    },

    updateTaskStatusAction: (state, action) => {
      state.updateTaskStatusData = action.payload;
      state.loading = false;
    },

    modifyTaskAction: (state, action) => {
      state.modifyTaskData = action.payload;
      state.loading = false;
    },

    getPendingTasksAction: (state, action) => {
      state.getPendingTasksData = action.payload;
      state.loading = false;
    }
  }
});
export default tasksSlice.reducer;

// Actions
const {
  startLoading,
  hasError,
  createTaskAction,
  deleteTaskAction,
  updateTaskStatusAction,
  modifyTaskAction,
  getPendingTasksAction
} = tasksSlice.actions;

export const createTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // add data to local storage
    let appData = JSON.parse(localStorage.getItem("appData"));
    if (appData) {
      appData = { ...appData, pendingTasks: [...appData.pendingTasks, data] };
    } else {
      appData = { pendingTasks: [data] };
    }
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Task created successfully");

    return dispatch(
      createTaskAction({
        message: "Task created successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Something went wrong");
    return dispatch(hasError(e.message));
  }
};

export const deleteTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteTaskApi(data);
    toast.success(response.data.message);
    return dispatch(deleteTaskAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(hasError(e.response.data.message));
  }
};

export const modifyTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyTaskApi(data);
    toast.success(response.data.message);
    return dispatch(modifyTaskAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(hasError(e.response.data.message));
  }
};

export const updateTaskStatus = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateTaskStatusApi(data);
    toast.success(response.data.message);
    return dispatch(updateTaskStatusAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(hasError(e.response.data.message));
  }
};

export const getPendingTasks = (data) => async (dispatch) => {
  try {
    dispatch(startLoading(true));
    const response = await JSON.parse(localStorage.getItem("appData"));
    if (response) {
      dispatch(startLoading(false));
      return response?.pendingTasks
        ? dispatch(getPendingTasksAction(response?.pendingTasks))
        : dispatch(getPendingTasksAction([]));
    } else {
      dispatch(startLoading(false));
      localStorage.setItem("appData", JSON.stringify({ pendingTasks: [] }));
      return dispatch(getPendingTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("Something went wrong");
    return dispatch(hasError(e.message));
  }
};

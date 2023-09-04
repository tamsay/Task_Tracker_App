import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: {},

  createTaskData: {},
  deleteTaskData: {},
  updateTaskStatusData: {},
  modifyTaskData: {},
  getNewTasksData: {},
  getDeletedTasksData: {},
  getCompletedTasksData: {},
  getUncompletedTasksData: {},
  updateReminderStatusData: {},
  getAllTasksData: {}
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

    getNewTasksAction: (state, action) => {
      state.getNewTasksData = action.payload;
      state.loading = false;
    },

    getDeletedTasksAction: (state, action) => {
      state.getDeletedTasksData = action.payload;
      state.loading = false;
    },

    getCompletedTasksAction: (state, action) => {
      state.getCompletedTasksData = action.payload;
      state.loading = false;
    },

    getUncompletedTasksAction: (state, action) => {
      state.getUncompletedTasksData = action.payload;
      state.loading = false;
    },

    updateReminderStatusAction: (state, action) => {
      state.updateReminderStatusData = action.payload;
      state.loading = false;
    },

    getAllTasksAction: (state, action) => {
      state.getAllTasksData = action.payload;
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
  getNewTasksAction,
  getDeletedTasksAction,
  getCompletedTasksAction,
  getUncompletedTasksAction,
  updateReminderStatusAction,
  getAllTasksAction
} = tasksSlice.actions;

export const createTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // retrieve current data from local storage
    let appData = JSON.parse(localStorage.getItem("appData"));

    if (appData) {
      // add new task to existing tasks
      appData = [...appData, data];
    } else {
      // create new appData array
      appData = [data];
    }

    // update local storage
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Task created successfully");

    return dispatch(
      createTaskAction({
        message: "Task created successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Task could not be created at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const deleteTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // retrieve current data from local storage
    let appData = JSON.parse(localStorage.getItem("appData"));

    if (appData) {
      // find the current task and update the status to deleted
      const index = appData.findIndex((task) => task.id === data);
      appData[index].status = "deleted";
    }

    // update local storage
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Task deleted successfully");

    return dispatch(
      deleteTaskAction({
        message: "Task deleted successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Task could not be deleted at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const modifyTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // retrieve current data from local storage
    let appData = JSON.parse(localStorage.getItem("appData"));

    if (appData) {
      // find the current task and replace it with the updated one
      const index = appData.findIndex((task) => task.id === data.id);
      appData[index] = data;
    }
    // update local storage
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Task modified successfully");

    return dispatch(
      modifyTaskAction({
        message: "Task modified successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Task could not be modified at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const updateTaskStatus = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());

    // retrieve current data from local storage
    let appData = JSON.parse(localStorage.getItem("appData"));

    if (appData) {
      // find the current task and update the status to the provided value
      const index = appData.findIndex((task) => task.id === data.id);
      appData[index].status = data?.status;
    }

    // update local storage
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Task status updated successfully");

    return dispatch(
      updateTaskStatusAction({
        message: "Task status updated successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Task status could not be updated at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const getNewTasks = () => async (dispatch) => {
  dispatch(startLoading(true));
  try {
    // retrieve current data from local storage
    const response = await JSON.parse(localStorage.getItem("appData"));
    if (Array.isArray(response)) {
      dispatch(startLoading(false));

      // Retrieve tasks with status of new
      const newTasks = response.filter((task) => task.status === "new");
      return dispatch(getNewTasksAction(newTasks));
    } else {
      dispatch(startLoading(false));

      // Initialize the new tasks array if it doesn't exist
      return dispatch(getNewTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("New tasks cannot be retrieved at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const getDeletedTasks = () => async (dispatch) => {
  dispatch(startLoading(true));
  try {
    // retrieve current data from local storage
    const response = await JSON.parse(localStorage.getItem("appData"));

    if (Array.isArray(response)) {
      dispatch(startLoading(false));

      // Retrieve tasks with status of deleted
      const deletedTasks = response.filter((task) => task.status === "deleted");
      return dispatch(getDeletedTasksAction(deletedTasks));
    } else {
      dispatch(startLoading(false));

      // Initialize the deleted tasks array if it doesn't exist
      return dispatch(getDeletedTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("Deleted tasks cannot be retrieved at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const getCompletedTasks = () => async (dispatch) => {
  dispatch(startLoading(true));
  try {
    // retrieve current data from local storage
    const response = await JSON.parse(localStorage.getItem("appData"));
    if (Array.isArray(response)) {
      dispatch(startLoading(false));

      // Retrieve tasks with status of completed
      const completedTasks = response.filter((task) => task.status === "completed");
      return dispatch(getCompletedTasksAction(completedTasks));
    } else {
      dispatch(startLoading(false));

      // Initialize the completed tasks array if it doesn't exist
      return dispatch(getCompletedTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("Completed tasks cannot be retrieved at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const getUncompletedTasks = () => async (dispatch) => {
  dispatch(startLoading(true));
  try {
    // retrieve current data from local storage
    const response = await JSON.parse(localStorage.getItem("appData"));
    if (Array.isArray(response)) {
      dispatch(startLoading(false));

      // Retrieve tasks with status of uncompleted

      const uncompletedTasks = response.filter((task) => task.status === "uncompleted");

      return dispatch(getUncompletedTasksAction(uncompletedTasks));
    } else {
      dispatch(startLoading(false));

      // Initialize the uncompleted tasks array if it doesn't exist
      return dispatch(getUncompletedTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("Uncompleted tasks cannot be retrieved at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const updateReminderStatus = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // retrieve current data from local storage
    let appData = JSON.parse(localStorage.getItem("appData"));

    if (appData) {
      // find the current task and update the reminder status to the provided value
      const index = appData.findIndex((task) => task.id === data.id);
      appData[index].reminder.status = data?.status;
    }

    // update local storage
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("Reminder status updated successfully");

    return dispatch(
      updateReminderStatusAction({
        message: "Reminder status updated successfully",
        success: true
      })
    );
  } catch (e) {
    toast.error("Reminder status could not be updated at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

export const getAllTasks = () => async (dispatch) => {
  dispatch(startLoading(true));
  try {
    // retrieve current data from local storage
    const response = await JSON.parse(localStorage.getItem("appData"));
    if (Array.isArray(response)) {
      dispatch(startLoading(false));

      return dispatch(getAllTasksAction(response));
    } else {
      dispatch(startLoading(false));

      return dispatch(getAllTasksAction([]));
    }
  } catch (e) {
    dispatch(startLoading(false));
    toast.error("Tasks cannot be retrieved at this time. Please try again later.");
    return dispatch(hasError(e.message));
  }
};

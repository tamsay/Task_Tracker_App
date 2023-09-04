import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cx from "classnames";

import styles from "./HomePage.module.scss";

import ConfirmationDialog from "@/components/Modals/ConfirmationDialog/ConfirmationDialog";
import CreateAndModifyTaskModal from "@/components/Modals/CreateAndModifyTask/CreateAndModifyTask";
import SetReminder from "@/components/Modals/SetReminder/SetReminder";
import Tabs from "@/components/Tabs/Tabs";

import notificationSound from "@/assets/audio/notification-1.mp3";

import {
  getAllTasks,
  getCompletedTasks,
  getDeletedTasks,
  getNewTasks,
  getUncompletedTasks,
  modifyTask
} from "@/redux/Tasks/TasksSlice";

import formatDate from "@/helpers/formatDate";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayModal = useSelector((state) => state.modal.show);
  const modalName = useSelector((state) => state.modal.modalName);

  const newTasks = useSelector((state) => state?.tasks?.getNewTasksData) || [];
  const completedTasks = useSelector((state) => state?.tasks?.getCompletedTasksData) || [];
  const uncompletedTasks = useSelector((state) => state?.tasks?.getUncompletedTasksData) || [];
  const deletedTasks = useSelector((state) => state?.tasks?.getDeletedTasksData) || [];

  useEffect(() => {
    dispatch(getNewTasks());
    dispatch(getDeletedTasks());
    dispatch(getCompletedTasks());
    dispatch(getUncompletedTasks());
  }, [dispatch]);

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  // This section is for the reminder notification
  useEffect(() => {
    const interval = setInterval(async () => {
      let response = await dispatch(getAllTasks());
      if (Array.isArray(response.payload) && response.payload.length > 0) {
        let tasks = response.payload;
        let dueReminderTasks = tasks.filter(
          (task) => task.reminder?.status && new Date(task.reminder.date) <= new Date()
        );

        dueReminderTasks.length &&
          dueReminderTasks.forEach((task) => {
            dispatch(modifyTask({ ...task, reminder: { date: null, status: false } }));
            dispatch(getNewTasks());
            dispatch(getCompletedTasks());
            dispatch(getUncompletedTasks());
            playNotificationSound();

            const toastData = {
              headerMessage: "Due Reminder Notification",
              message: `${task.title} is due on ${formatDate(task.reminder.date)}`
            };

            const ToastMessage = () => {
              return (
                <div className={cx(styles.toastMessageContainer, "flexCol")}>
                  <h5 className={cx(styles.header)}>{toastData.headerMessage}</h5>
                  <p className={cx(styles.message)}>{toastData.message}</p>
                </div>
              );
            };

            toast.info(<ToastMessage />, {
              position: "top-center",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              toastId: task.id,
              icon: false
            });
          });
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const getTabMenu = () => {
    let menuObject = {
      ["new-tasks"]: `New Tasks - (${newTasks.length})`,
      ["completed-tasks"]: `Completed Tasks - (${completedTasks.length})`,
      ["uncompleted-tasks"]: `Uncompleted Tasks - (${uncompletedTasks.length})`,
      ["deleted-tasks"]: `Deleted Tasks - (${deletedTasks.length})`
    };

    const tabMenu = Object.keys(menuObject).map((key) => {
      return {
        id: key,
        name: menuObject[key],
        path: key
      };
    });
    return tabMenu;
  };

  const handleTabMenuClick = (tab) => {
    navigate(tab.path);
  };

  return (
    <div className={cx(styles.homepageContainer, "flexCol")}>
      <div className={cx(styles.tabsWrapper, "flexCol")}>
        <Tabs data={getTabMenu()} onClick={handleTabMenuClick} />
      </div>

      <div className={cx(styles.contentWrapper)}>
        <Outlet />
      </div>

      {displayModal && modalName === "createAndModifyTask" ? <CreateAndModifyTaskModal show size='md' /> : null}
      {displayModal && modalName === "confirmationDialog" ? <ConfirmationDialog show size='md' /> : null}
      {displayModal && modalName === "setReminder" ? <SetReminder show size='md' /> : null}
    </div>
  );
};

export default HomePage;

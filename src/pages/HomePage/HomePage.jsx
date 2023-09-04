import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cx from "classnames";

import styles from "./HomePage.module.scss";

import Button from "@/components/Button/Button";
import ConfirmationDialog from "@/components/Modals/ConfirmationDialog/ConfirmationDialog";
import CreateAndModifyTaskModal from "@/components/Modals/CreateAndModifyTask/CreateAndModifyTask";
import SetReminder from "@/components/Modals/SetReminder/SetReminder";
import Tabs from "@/components/Tabs/Tabs";

import notificationSound from "@/assets/audio/notification-1.mp3";

import { showModal } from "@/redux/Modal/ModalSlice";
import {
  getAllTasks,
  getCompletedTasks,
  getDeletedTasks,
  getNewTasks,
  getUncompletedTasks,
  modifyTask
} from "@/redux/Tasks/TasksSlice";

import formatDate from "@/helpers/formatDate";

import useIsMobile from "@/hooks/useIsMobile";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(notificationSound);

    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    audioElement.play();
  };

  useEffect(() => {
    // Add a global event listener to handle notifications even when the tab is not active
    window.addEventListener("showNotification", () => {
      playNotificationSound();
    });

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("showNotification", () => {});
    };
  }, []);

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

            // Trigger the event to play the sound
            const event = new Event("showNotification");
            window.dispatchEvent(event);

            const toastData = {
              headerMessage: "Due Reminder Notification",
              message: `${task.title} is due on ${formatDate(task.dueDate)}`
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

  const displayCreateModal = () => {
    dispatch(
      showModal({
        modalData: {
          action: "create",
          taskData: {}
        },
        name: "createAndModifyTask"
      })
    );
  };

  const handleResetApp = () => {
    // display confirmation dialog
    dispatch(
      showModal({
        modalData: {
          action: "resetApp",
          title: "Reset App",
          message: "Are you sure you want to reset the app?"
        },
        name: "confirmationDialog"
      })
    );
  };

  return (
    <div className={cx(styles.homepageContainer, "flexCol")}>
      {isMobile && (
        <div className={cx(styles.headerBtnGroup, "flexRow-fully-centered")}>
          <Button className={cx(styles.navButton)} title='Create Task' onClick={() => displayCreateModal()} />
          <Button
            className={cx(styles.navButton)}
            title='Reset App'
            onClick={() => handleResetApp()}
            type='secondary'
          />
        </div>
      )}

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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import cx from "classnames";

import styles from "./HomePage.module.scss";

import ConfirmationDialog from "@/components/Modals/ConfirmationDialog/ConfirmationDialog";
import CreateAndModifyTaskModal from "@/components/Modals/CreateAndModifyTask/CreateAndModifyTask";
import SetReminder from "@/components/Modals/SetReminder/SetReminder";
import Tabs from "@/components/Tabs/Tabs";

import { getCompletedTasks, getDeletedTasks, getNewTasks, getUncompletedTasks } from "@/redux/Tasks/TasksSlice";

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

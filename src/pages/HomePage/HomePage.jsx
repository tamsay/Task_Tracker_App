import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./HomePage.module.scss";

import CreateAndModifyTaskModal from "@/components/Modals/CreateAndModifyTask/CreateAndModifyTask";

import TaskList from "@/components/TaskList/TaskList";

import { hideModal, showModal } from "@/redux/Modal/ModalSlice";
import Loader from "@/components/Loader/Loader";
import { getNewTasks, getDeletedTasks, getCompletedTasks, getUncompletedTasks } from "@/redux/Tasks/TasksSlice";

import Tabs from "@/components/Tabs/Tabs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ConfirmationDialog from "@/components/Modals/ConfirmationDialog/ConfirmationDialog";
import SetReminder from "@/components/Modals/SetReminder/SetReminder";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const modalData = useSelector((state) => state.modal.modalData);
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
  }, []);

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

HomePage.defaultProps = {
  title: ""
};

HomePage.propTypes = {
  title: PropTypes.string
};

export default HomePage;

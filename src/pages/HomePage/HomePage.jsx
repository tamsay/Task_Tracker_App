import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./HomePage.module.scss";

import TestModal from "@/components/Modals/CreateTask/CreateTask";
import TaskList from "@/components/TaskList/TaskList";

import { hideModal, showModal } from "@/redux/Modal/ModalSlice";
import { getPendingTasks } from "@/redux/Tasks/TasksSlice";
import Loader from "@/components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const modalData = useSelector((state) => state.modal.modalData);
  const displayModal = useSelector((state) => state.modal.show);
  const modalName = useSelector((state) => state.modal.modalName);

  const pendingTasks = useSelector((state) => state?.tasks?.getPendingTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);
  console.log(loading, "loading");

  console.log("pendingTasks", pendingTasks);

  useEffect(() => {
    dispatch(getPendingTasks());
  }, []);

  return (
    <div className={cx(styles.homepageContainer, "flexCol")}>
      {loading ? (
        <Loader />
      ) : Array.isArray(pendingTasks) && pendingTasks.length > 0 ? (
        pendingTasks?.map((task, index) => {
          return <TaskList key={index} data={task} />;
        })
      ) : (
        <p>No Pending Tasks Found</p>
      )}
      {displayModal && modalName === "testModal" ? <TestModal show size='md' /> : null}
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

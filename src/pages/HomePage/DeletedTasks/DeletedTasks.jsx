import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { getDeletedTasks } from "@/redux/Tasks/TasksSlice";
const DeletedTasks = () => {
  const dispatch = useDispatch();

  const deletedTasks = useSelector((state) => state?.tasks?.getDeletedTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  useEffect(() => {
    dispatch(getDeletedTasks());
  }, [dispatch]);

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      {loading ? (
        <Loader />
      ) : Array.isArray(deletedTasks) && deletedTasks.length > 0 ? (
        <div className={cx(styles.tasksList, "flexCol")}>
          {deletedTasks?.map((task, index) => {
            return <TaskList key={index} data={task} />;
          })}
        </div>
      ) : (
        <div className={cx(styles.emptyDiv, "flexRow-fully-centered")}>
          <p>No Deleted Task(s) Found</p>
        </div>
      )}
    </div>
  );
};

export default DeletedTasks;

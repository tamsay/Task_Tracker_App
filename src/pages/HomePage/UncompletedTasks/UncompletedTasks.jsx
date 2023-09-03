import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { getUncompletedTasks } from "@/redux/Tasks/TasksSlice";
const UncompletedTasks = () => {
  const dispatch = useDispatch();

  const uncompletedTasks = useSelector((state) => state?.tasks?.getUncompletedTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  useEffect(() => {
    dispatch(getUncompletedTasks());
  }, [dispatch]);

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      {loading ? (
        <Loader />
      ) : Array.isArray(uncompletedTasks) && uncompletedTasks.length > 0 ? (
        <div className={cx(styles.tasksList, "flexCol")}>
          {uncompletedTasks?.map((task, index) => {
            return <TaskList key={index} data={task} />;
          })}
        </div>
      ) : (
        <div className={cx(styles.emptyDiv, "flexRow-fully-centered")}>
          <p>No Completed Task(s) Found</p>
        </div>
      )}
    </div>
  );
};

export default UncompletedTasks;

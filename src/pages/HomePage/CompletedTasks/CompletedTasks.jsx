import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { getCompletedTasks } from "@/redux/Tasks/TasksSlice";
const CompletedTasks = () => {
  const dispatch = useDispatch();

  const completedTasks = useSelector((state) => state?.tasks?.getCompletedTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  useEffect(() => {
    dispatch(getCompletedTasks());
  }, [dispatch]);

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      {loading ? (
        <Loader />
      ) : Array.isArray(completedTasks) && completedTasks.length > 0 ? (
        <div className={cx(styles.tasksList, "flexCol")}>
          {completedTasks?.map((task, index) => {
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

export default CompletedTasks;

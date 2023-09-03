import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { getNewTasks } from "@/redux/Tasks/TasksSlice";

const NewTasks = () => {
  const dispatch = useDispatch();

  const newTasks = useSelector((state) => state?.tasks?.getNewTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  useEffect(() => {
    dispatch(getNewTasks());
  }, [dispatch]);

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      {loading ? (
        <Loader />
      ) : Array.isArray(newTasks) && newTasks.length > 0 ? (
        <div className={cx(styles.tasksList, "flexCol")}>
          {newTasks?.map((task, index) => {
            return <TaskList key={index} data={task} />;
          })}
        </div>
      ) : (
        <div className={cx(styles.emptyDiv, "flexRow-fully-centered")}>
          <p>No New Task(s) Found</p>
        </div>
      )}
    </div>
  );
};

export default NewTasks;

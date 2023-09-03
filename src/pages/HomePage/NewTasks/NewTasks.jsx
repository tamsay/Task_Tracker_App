import React, { useEffect } from "react";
import cx from 'classnames';
import styles from '../TasksLayout.module.scss';
import { useDispatch, useSelector } from "react-redux";
import TaskList from "@/components/TaskList/TaskList";
import { getNewTasks } from "@/redux/Tasks/TasksSlice";
import Loader from "@/components/Loader/Loader";

const NewTasks = () => {
  const dispatch = useDispatch();

    const newTasks = useSelector((state) => state?.tasks?.getNewTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

    useEffect(() => {
    dispatch(getNewTasks());
  }, []);

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
        <p>No New Task(s) Found</p>
      )}
    </div>
  )
}

export default NewTasks;
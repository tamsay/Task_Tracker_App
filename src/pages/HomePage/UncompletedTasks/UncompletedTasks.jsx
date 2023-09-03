import React, { useEffect } from "react";
import cx from 'classnames';
import styles from '../TasksLayout.module.scss';
import { useDispatch, useSelector } from "react-redux";
import TaskList from "@/components/TaskList/TaskList";
import { getUncompletedTasks } from "@/redux/Tasks/TasksSlice";
import Loader from "@/components/Loader/Loader";
const UncompletedTasks = () => {

  const dispatch = useDispatch();

    const uncompletedTasks = useSelector((state) => state?.tasks?.getUncompletedTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  console.log(uncompletedTasks, 'completed')

    useEffect(() => {
    dispatch(getUncompletedTasks());
  }, []);

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
        <p>No Uncompleted Task(s) Found</p>
      )}
    </div>
  )
}

export default UncompletedTasks
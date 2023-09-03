import React, { useEffect } from "react";
import cx from 'classnames';
import styles from '../TasksLayout.module.scss';
import { useDispatch, useSelector } from "react-redux";
import TaskList from "@/components/TaskList/TaskList";
import { getCompletedTasks } from "@/redux/Tasks/TasksSlice";
import Loader from "@/components/Loader/Loader";
const CompletedTasks = () => {

  const dispatch = useDispatch();

    const completedTasks = useSelector((state) => state?.tasks?.getCompletedTasksData);
  const loading = useSelector((state) => state?.tasks?.loading);

  console.log(completedTasks, 'completed')

    useEffect(() => {
    dispatch(getCompletedTasks());
  }, []);

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
        <p>No Completed Task(s) Found</p>
      )}
    </div>
  )
}

export default CompletedTasks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { ReactComponent as GridViewIcon } from "@/assets/icons/grid-view-icon.svg";
import { ReactComponent as ListViewIcon } from "@/assets/icons/list-view-icon.svg";

import { getNewTasks } from "@/redux/Tasks/TasksSlice";

import useIsMobile from "@/hooks/useIsMobile";

const NewTasks = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const [view, setView] = useState("grid");

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
        <>
          {!isMobile && (
            <div className={cx(styles.viewToggler, "flexRow")}>
              <GridViewIcon
                onClick={() => setView("grid")}
                className={cx(styles.icon, view === "grid" ? styles.isActive : null)}
              />
              <ListViewIcon
                onClick={() => setView("list")}
                className={cx(styles.icon, view === "list" ? styles.isActive : null)}
              />
            </div>
          )}
          <div className={cx(styles.tasksList, "flexCol", view === "grid" ? styles.gridView : styles.listView)}>
            {newTasks?.map((task, index) => {
              return <TaskList key={index} data={task} />;
            })}
          </div>
        </>
      ) : (
        <div className={cx(styles.emptyDiv, "flexRow-fully-centered")}>
          <p>No New Task(s) Found</p>
        </div>
      )}
    </div>
  );
};

export default NewTasks;

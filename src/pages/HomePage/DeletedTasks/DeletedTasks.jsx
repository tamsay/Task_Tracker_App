import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../TasksLayout.module.scss";

import Loader from "@/components/Loader/Loader";
import TaskList from "@/components/TaskList/TaskList";

import { ReactComponent as GridViewIcon } from "@/assets/icons/grid-view-icon.svg";
import { ReactComponent as ListViewIcon } from "@/assets/icons/list-view-icon.svg";

import { getDeletedTasks } from "@/redux/Tasks/TasksSlice";

import useIsMobile from "@/hooks/useIsMobile";
const DeletedTasks = () => {
  const dispatch = useDispatch();

  const isMobile = useIsMobile();

  const [view, setView] = useState("grid");

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
            {deletedTasks?.map((task, index) => {
              return <TaskList key={index} data={task} />;
            })}
          </div>
        </>
      ) : (
        <div className={cx(styles.emptyDiv, "flexRow-fully-centered")}>
          <p>No Deleted Task(s) Found</p>
        </div>
      )}
    </div>
  );
};

export default DeletedTasks;

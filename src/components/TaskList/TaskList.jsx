import React from "react";
import cx from "classnames";
import styles from "./TaskList.module.scss";
import Button from "@/components/Button/Button";
import formatDate from "@/helpers/formatDate";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/Modal/ModalSlice";
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { updateReminderStatus, getCompletedTasks, getNewTasks, getUncompletedTasks } from "@/redux/Tasks/TasksSlice";

const TaskList = ({data}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1].toLowerCase();

  const handleComplete = () => {
               dispatch(
      showModal({
        modalData: {
          action: currentPath === "uncompleted-tasks" || currentPath === "new-tasks" || currentPath === "" ? "markTaskAsComplete" : "markTaskAsUncomplete",
          payload: data?.id,
          title: currentPath === "uncompleted-tasks" || currentPath === "new-tasks" || currentPath === "" ? "Mark Task As Complete" : "Mark Task As Incomplete",
          message: currentPath === "uncompleted-tasks" || currentPath === "new-tasks" || currentPath === "" ? "Are you sure you want to mark this task as complete?" : "Are you sure you want to mark this task as incomplete?"
        },
        name: "confirmationDialog"
      })
    );
    }

    const handleModify = () => {
          dispatch(
      showModal({
        modalData: {
          action: "modify",
          taskData: {...data}
        },
        name: "createAndModifyTask"
      })
    );
      }

      const handleDelete = () => {
          dispatch(
      showModal({
        modalData: {
          action: "deleteTask",
          payload: data?.id,
          title: "Delete Task",
          message: "Are you sure you want to delete this task?"
        },
        name: "confirmationDialog"
      })
    );
  }

  const handleReminder = () => {
   // first check if reminder is active or not
    if(data?.reminder?.status) {
      // if reminder is active, then deactivate it
      dispatch(updateReminderStatus({id: data?.id, status: false}))
    } else {
      // if reminder status is not active and current reminder date is not passed, then activate it
      if(new Date(data?.reminder?.date) > new Date()) {
        dispatch(updateReminderStatus({id: data?.id, status: true}))
      } else {
        // if reminder status is not active and current reminder date is passed, then show set reminder modal
        dispatch(
      showModal({
        modalData: {
          taskData: {...data}
        },
        name: "setReminder"
      })
    );
      }    
    }

    dispatch(getNewTasks());
    dispatch(getUncompletedTasks());
    dispatch(getCompletedTasks());
  }

  return (
    <section className={cx(styles.taskListContainer, "flexCol", data?.reminder?.status && currentPath !== "deleted-tasks"  ? styles.reminderActive : styles.reminderInactive)}>
        {currentPath !== "deleted-tasks" && <Icon icon="arcticons:hourlyreminder" onClick={handleReminder}  />}
      <header className={"flexCol"}>
            <h5 className={cx(styles.title)}>{data?.title}</h5>
      <p className={cx(styles.description)}>{data?.description}</p>
      <span className={cx(styles.dueDate)}>{`Due Date:  ${formatDate(data?.dueDate)}`}</span>
      </header>
  

    {currentPath !== "deleted-tasks" ?  <footer className={cx(styles.btnGroup, "flexRow-right-centered")}>
        <Button title={currentPath === "completed-tasks" ? "Mark as Incomplete" : "Mark as Complete"} onClick={handleComplete} size="small" />
        <Button title="Modify" onClick={handleModify} size="small" type="secondary" />
        <Button title="Delete" onClick={handleDelete} size="small" type="secondary" />
      </footer> : null}
    </section>
  )
};

export default TaskList;

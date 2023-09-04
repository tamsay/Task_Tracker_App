import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ConfirmationDialog.module.scss";

import Button from "@/components/Button/Button";

import { hideModal } from "@/redux/Modal/ModalSlice";
import {
  deleteTask,
  getCompletedTasks,
  getDeletedTasks,
  getNewTasks,
  getUncompletedTasks,
  updateTaskStatus
} from "@/redux/Tasks/TasksSlice";

const ConfirmationDialog = ({ show, size }) => {
  const dispatch = useDispatch();

  const { message, title, payload, action } = useSelector((state) => state.modal.modalData);
  const modalName = useSelector((state) => state.modal.modalName);

  const handleConfirmation = async () => {
    let response = {};

    switch (action) {
      case "deleteTask":
        response = await dispatch(deleteTask(payload));
        break;
      case "markTaskAsComplete":
        response = await dispatch(updateTaskStatus({ id: payload, status: "completed" }));
        break;
      case "markTaskAsUncomplete":
        response = await dispatch(updateTaskStatus({ id: payload, status: "uncompleted" }));
        break;
      case "resetApp":
        localStorage.clear();
        window.location.href = "/";
        break;
      default:
        break;
    }

    if (response.payload.success) {
      dispatch(
        hideModal({
          name: "confirmationDialog"
        })
      );
      dispatch(getNewTasks());
      dispatch(getDeletedTasks());
      dispatch(getCompletedTasks());
      dispatch(getUncompletedTasks());
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal({ name: modalName }));
  };

  return (
    <ModalContainer show={show} size={size}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>{title}</h6>
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <p>{message}</p>
        </div>

        <div className={cx(styles.modalFooter)}>
          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={() => handleCloseModal()} title='Cancel' type='secondary' />
            <Button type='primary' onClick={handleConfirmation} title='Confirm' />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

ConfirmationDialog.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string
};

export default ConfirmationDialog;

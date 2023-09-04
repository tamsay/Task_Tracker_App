import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./SetReminder.module.scss";

import Button from "@/components/Button/Button";
import Input from "@/components/FixedLabelInput/FixedLabelInput";

import { hideModal } from "@/redux/Modal/ModalSlice";
import {
  getCompletedTasks,
  getDeletedTasks,
  getNewTasks,
  getUncompletedTasks,
  modifyTask
} from "@/redux/Tasks/TasksSlice";

const SetReminder = ({ show, size }) => {
  const dispatch = useDispatch();

  const { action, taskData } = useSelector((state) => state.modal.modalData);
  const [showReminder, setShowReminder] = useState(taskData?.reminder?.status);

  const defaultValues = {
    reminder: action === "create" ? "" : taskData?.reminder?.date,
    showReminder: action === "create" ? false : taskData?.reminder?.status
  };

  const createTaskSchema = Yup.object().shape({
    showReminder: Yup.boolean(),
    reminder: Yup.date().when("showReminder", {
      is: true,
      then: (schema) =>
        schema
          .min(new Date(), "Reminder Date must be greater than or equal to the current date and time")
          .required("Reminder Date is required"),
      otherwise: (schema) => schema.nullable()
    })
  });

  const resolver = yupResolver(createTaskSchema);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleFormSubmission = async (data) => {
    let payload = {
      id: taskData?.id,
      title: taskData?.title,
      description: taskData?.description,
      status: taskData?.status,
      createdAt: taskData?.createdAt,
      updatedAt: `${new Date()}`,
      dueDate: taskData?.dueDate,
      reminder: {
        status: showReminder,
        date: data.reminder
      }
    };

    let response = await dispatch(modifyTask(payload));

    if (response.payload.success) {
      dispatch(
        hideModal({
          name: "setReminder"
        })
      );
      dispatch(getNewTasks());
      dispatch(getCompletedTasks());
      dispatch(getUncompletedTasks());
      dispatch(getDeletedTasks());
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal({ name: "setReminder" }));
  };

  const handleReminderToggle = (checked) => {
    setShowReminder(checked);

    if (checked === false) {
      setValue("reminder", null, { shouldValidate: true });
    }

    setValue("showReminder", checked, { shouldValidate: true });
  };

  return (
    <ModalContainer show={show} size={size}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <form
          className={cx(styles.formWrapper, "flexCol")}
          onSubmit={handleSubmit((data) => handleFormSubmission(data))}
        >
          <div className={cx(styles.modalHeader, "flexCol")}>
            <h6 className={cx(styles.headerTitle)}>Update Reminder</h6>
          </div>

          <div className={cx(styles.modalBody, "flexCol")}>
            <>
              <div style={{ width: "100%", gap: "0.5rem" }} className={cx("flexRow-left-centered")}>
                <label htmlFor='reminder'>Set Reminder</label>
                <input
                  type='checkbox'
                  name='showReminder'
                  id='showReminder'
                  onClick={(e) => handleReminderToggle(e.target.checked)}
                  checked={showReminder}
                  {...register("showReminder")}
                />
              </div>
              {showReminder && (
                <Controller
                  name='reminder'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label='Reminder Date'
                      type='datetime-local'
                      error={errors?.reminder && errors?.reminder?.message}
                    />
                  )}
                />
              )}
            </>
          </div>

          <div className={cx(styles.modalFooter)}>
            <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
              <Button onClick={() => handleCloseModal()} title='Cancel' type='secondary' />
              <Button type='primary' onClick={handleSubmit((data) => handleFormSubmission(data))} title='Save' />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

SetReminder.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string
};

export default SetReminder;

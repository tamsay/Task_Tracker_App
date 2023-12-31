import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./CreateAndModifyTask.module.scss";

import Button from "@/components/Button/Button";
import Input from "@/components/FixedLabelInput/FixedLabelInput";
import QuillEditor from "@/components/QuillEditor/QuillEditor";

import { hideModal } from "@/redux/Modal/ModalSlice";
import { createTask, getCompletedTasks, getNewTasks, getUncompletedTasks, modifyTask } from "@/redux/Tasks/TasksSlice";

const CreateAndModifyTask = ({ show, size }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { action, taskData } = useSelector((state) => state.modal.modalData);
  const [showReminder, setShowReminder] = useState(taskData?.reminder?.status);

  const defaultValues = {
    title: action === "create" ? "" : taskData?.title,
    description: action === "create" ? "" : taskData?.description,
    dueDate: action === "create" ? null : taskData?.dueDate,
    reminder: action === "create" ? null : taskData?.reminder?.date,
    showReminder: action === "create" ? false : taskData?.reminder?.status
  };

  const createTaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date()
      .min(new Date(), "Due Date must be greater than or equal to the current date and time")
      .required("Due Date is required"),
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
    setValue,
    register
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleFormSubmission = async (data) => {
    let payload = {
      id: action === "create" ? nanoid() : taskData?.id,
      title: data.title,
      description: data.description,
      status: action === "create" ? "new" : taskData?.status,
      createdAt: action === "create" ? `${new Date()}` : taskData?.createdAt,
      updatedAt: `${new Date()}`,
      dueDate: data.dueDate,
      reminder: data?.reminder ? { status: showReminder, date: data.reminder } : { status: showReminder, date: null }
    };

    let response = action === "create" ? await dispatch(createTask(payload)) : await dispatch(modifyTask(payload));

    if (response.payload.success) {
      dispatch(
        hideModal({
          name: "createTask"
        })
      );
      dispatch(getNewTasks());
      dispatch(getCompletedTasks());
      dispatch(getUncompletedTasks());

      action === "create" && navigate("/");
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal({ name: "createTask" }));
  };

  const getQuillContent = (data) => {
    setValue("description", data);
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
            <h6 className={cx(styles.headerTitle)}>{action === "create" ? "Create Task" : "Modify Task"}</h6>
          </div>

          <div className={cx(styles.modalBody, "flexCol")}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label='Title'
                  placeholder='Enter Title'
                  type='text'
                  error={errors?.title && errors?.title?.message}
                />
              )}
            />

            <div className={cx(styles.quillEditorDiv)}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label='Description'
                    placeholder='Enter Description'
                    getQuillContent={getQuillContent}
                    error={errors?.description && errors?.description?.message}
                    className={cx(styles.quillNew)}
                  />
                )}
              />
            </div>
            <Controller
              name='dueDate'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label='Due Date'
                  type='datetime-local'
                  error={errors?.dueDate && errors?.dueDate?.message}
                />
              )}
            />

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
              <Button
                type='primary'
                onClick={handleSubmit((data) => handleFormSubmission(data))}
                title={action === "create" ? "Create" : "Modify"}
              />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

CreateAndModifyTask.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string
};

export default CreateAndModifyTask;

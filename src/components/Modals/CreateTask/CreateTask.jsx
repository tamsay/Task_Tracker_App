import React from "react";

import ModalContainer from "../ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getPendingTasks } from "@/redux/Tasks/TasksSlice";
import { hideModal } from "@/redux/Modal/ModalSlice";
import { nanoid } from "nanoid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FixedLabelInput/FixedLabelInput";
import * as Yup from "yup";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import styles from "./CreateTask.module.scss";
import cx from "classnames";

const CreateTask = ({ show, size }) => {
  const dispatch = useDispatch();

    const defaultValues = {
    title: "",
    description: "",
    dueDate: "",
  };

  const addUserSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });

  const resolver = yupResolver(addUserSchema);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleCreateTask = async (data) => {
    let payload = {
      id: nanoid(),
      title: data.title,
      description: data.description,
      status: "pending",
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      dueDate: data.dueDate,
    };
    let response = await dispatch(createTask(payload));
    console.log("response", response.payload.success);
    if(response.payload.success) {
      dispatch(hideModal({
      name: "testModal",
    }));
    dispatch(getPendingTasks());
    };
  };

    const handleCloseModal = () => {
    dispatch(hideModal({ name: "createTask" }));
  };

  return (
    <ModalContainer show={show} size={size}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
          <form className={cx(styles.formWrapper, "flexCol")} onSubmit={handleSubmit((data) => handleCreateTask(data))}>
          <div className={cx(styles.modalHeader, "flexCol")}>
            <h6 className={cx(styles.headerTitle)}>Create Task</h6>
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

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextArea
                      {...field}
                      label='Description'
                      placeholder='Enter Description...'
                      minHeight='150px'
                      error={errors?.description && errors?.description?.message}
                      borderColor="none"
                    />
              )}
            />

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
          </div>

          <div className={cx(styles.modalFooter)}>
            <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
              <Button onClick={() => handleCloseModal()} title='Cancel' type='secondary' />
              <Button
                type='primary'
                onClick={handleSubmit((data) => handleCreateTask(data))}
                title='Send'
              />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateTask;

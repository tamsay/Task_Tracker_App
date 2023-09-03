import React, {useState} from "react";

import ModalContainer from "../ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { createTask, modifyTask, getNewTasks, getCompletedTasks, getUncompletedTasks } from "@/redux/Tasks/TasksSlice";
import { hideModal } from "@/redux/Modal/ModalSlice";
import { nanoid } from "nanoid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FixedLabelInput/FixedLabelInput";
import * as Yup from "yup";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import styles from "./CreateAndModifyTask.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";


const CreateTask = ({ show, size }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const {action, taskData} = useSelector((state) => state.modal.modalData);
  const [reminder, setReminder] = useState(taskData?.reminder?.status);
console.log(taskData, 'taskData')
    const defaultValues = {
    title: action === "create" ? "" : taskData?.title,
    description: action === "create" ? "" : taskData?.description,
    dueDate: action === "create" ? null : taskData?.dueDate,
    reminder: action === "create" ? null : taskData?.reminder?.date,
  };

  const createTaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
      dueDate: Yup.date()
    .min(new Date(), "Due Date must be greater than or equal to the current date and time")
    .required("Due Date is required"),
    reminder: Yup.date()
    .nullable() // Allow null values
    .when(['dueDate'], (dueDate, schema) =>
      dueDate && schema.min(new Date(), 'Reminder date must be greater than the current date and time')
    )
  });

  const resolver = yupResolver(createTaskSchema);

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleFormSubmission = async (data) => {
    let payload = {
      id: action === "create" ? nanoid() : taskData?.id,
      title: data.title,
      description: data.description,
      status: action === "create" ? "new" : taskData?.status,
      createdAt: action === "create" ? `${new Date()}` : taskData?.createdAt ,
      updatedAt: `${new Date()}`,
      dueDate: data.dueDate,
      reminder: reminder ? {status: reminder, date: data.reminder} : {status: reminder, date: null}
    };

    let response = action === "create" ? await dispatch(createTask(payload)) : await dispatch(modifyTask(payload));

    if(response.payload.success) {
      dispatch(hideModal({
      name: "createTask",
    }));
    dispatch(getNewTasks());
    dispatch(getCompletedTasks());
    dispatch(getUncompletedTasks());

    action === "create" && navigate("/");
    };
    
  };

    const handleCloseModal = () => {
    dispatch(hideModal({ name: "createTask" }));
  };
console.log(reminder, 'rm')
console.log(errors, 'errors')
  return (
    <ModalContainer show={show} size={size}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
          <form className={cx(styles.formWrapper, "flexCol")} onSubmit={handleSubmit((data) => handleFormSubmission(data))}>
          <div className={cx(styles.modalHeader, "flexCol")}>
            <h6 className={cx(styles.headerTitle)}>{action === 'create' ? 'Create Task' : 'Modify Task'}</h6>
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

<>
<div style={{width: '100%', gap: '0.5rem'}} className={cx("flexRow-left-centered")}>
<label htmlFor="reminder">Set Reminder</label> 
<input type="checkbox" name="reminder" id="reminder" onChange={(e)=>setReminder(e.target.checked)} checked={taskData?.reminder?.status} />
</div>
{
  reminder && (
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
  )
}
</>

          </div>

          <div className={cx(styles.modalFooter)}>
            <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
              <Button onClick={() => handleCloseModal()} title='Cancel' type='secondary' />
              <Button
                type='primary'
                onClick={handleSubmit((data) => handleFormSubmission(data))}
                title={action === 'create' ? 'Create' : 'Modify'}
              />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateTask;

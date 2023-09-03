import React, {useState} from "react";

import ModalContainer from "../ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { modifyTask, getNewTasks, getCompletedTasks, getUncompletedTasks, getDeletedTasks } from "@/redux/Tasks/TasksSlice";
import { hideModal } from "@/redux/Modal/ModalSlice";
import { nanoid } from "nanoid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FixedLabelInput/FixedLabelInput";
import * as Yup from "yup";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import styles from "./SetReminder.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";


const SetReminder = ({ show, size }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {action, taskData} = useSelector((state) => state.modal.modalData);
  const [reminder, setReminder] = useState(taskData?.reminder?.status);

  console.log(taskData, 'taskData')


    const defaultValues = {
        reminder: action === "create" ? "" : taskData?.reminder?.date || "",
  };

  const createTaskSchema = Yup.object().shape({
    reminder: Yup.date()
    .when(['dueDate'], (dueDate, schema) =>
      schema.min(new Date(), 'Reminder date must be greater than the current date and time')
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
      id: taskData?.id,
      title: taskData?.title,
      description: taskData?.description,
      status: taskData?.status,
      createdAt: taskData?.createdAt ,
      updatedAt: `${new Date()}`,
      dueDate: taskData?.dueDate,
      reminder: {
        status: reminder,
        date: data.reminder
      }
    };

    let response = await dispatch(modifyTask(payload));
    console.log("response", response.payload.success);
    if(response.payload.success) {
      dispatch(hideModal({
      name: "setReminder",
    }));
    dispatch(getNewTasks());
    dispatch(getCompletedTasks());
    dispatch(getUncompletedTasks());
    dispatch(getDeletedTasks());
    };
    
  };

    const handleCloseModal = () => {
    dispatch(hideModal({ name: "setReminder" }));
  };

  return (
    <ModalContainer show={show} size={size}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
          <form className={cx(styles.formWrapper, "flexCol")} onSubmit={handleSubmit((data) => handleFormSubmission(data))}>
          <div className={cx(styles.modalHeader, "flexCol")}>
            <h6 className={cx(styles.headerTitle)}>Update Reminder</h6>
          </div>

          <div className={cx(styles.modalBody, "flexCol")}>
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
                title="Save"
              />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default SetReminder;

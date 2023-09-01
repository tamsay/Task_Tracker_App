import React from "react";

import ModalContainer from "../ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getPendingTasks } from "@/redux/Tasks/TasksSlice";
import { hideModal } from "@/redux/Modal/ModalSlice";

const TestModal = ({ show, size }) => {
  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    let response = await dispatch(createTask({
      title: "Test Task",
      description: "This is a test task",
      status: "pending",
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      dueDate: `${new Date()}`,
      priority: "low",
      category: "test",
      }));
    console.log("response", response.payload.success);
    if(response.payload.success) {
      dispatch(hideModal({
      name: "testModal",
    }));
    dispatch(getPendingTasks());
    };
  };

  return (
    <ModalContainer show={show} size={size}>
      <div style={{ backgroundColor: "red", padding: "2rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque vitae fuga hic aperiam necessitatibus,
        soluta quas quae nulla culpa beatae architecto libero placeat ea sed porro earum minima quam!
      </div>
      <button onClick={() => handleCreateTask()}>Create Task</button>
    </ModalContainer>
  );
};

export default TestModal;

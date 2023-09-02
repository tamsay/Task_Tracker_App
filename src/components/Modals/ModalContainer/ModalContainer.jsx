import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { hideModal } from "@/redux/Modal/ModalSlice";

import "./ModalContainer.scss";

const ModalContainer = ({ children, show, size = "md", modalName }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal({ name: modalName }));

  return (
    <>
      <div className=''>
        <Modal
          show={show}
          onHide={handleClose}
          scrollable={true}
          centered
          size={size}
          dialogClassName='generic-modal-wrapper'
          backdrop='static'
        >
          <Modal.Body className='generic-modal-body'>{children}</Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalContainer;

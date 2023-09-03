import React from "react";
import PropTypes from "prop-types";

import { ToastContainer } from "./styles";

export const ToastSuccess = ({ message, isOpen, close }) => {
  return (
    <div
      style={{
        background: "rgba(21, 164, 18, 0.9)",
        width: "fit-content",
        height: "30px",
        padding: "20px 15px 20px 15px",
        border: "none",
        borderRadius: "4px",
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "90px",
        position: "fixed",
        top: "35px",
        left: "40%",
        zIndex: "1000"
      }}
    >
      <span style={{ color: "#fff" }}>{message}</span>
      <span
        style={{
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          marginLeft: "30px"
        }}
        onClick={close}
      >
        Dismiss
      </span>
    </div>
  );
};

export const ToastError = ({ message, isOpen, close }) => {
  return (
    <ToastContainer isOpen={isOpen}>
      <div className='toast-inner'>
        <span className='errors'>{message}</span>
        <span className='action' onClick={close}>
          Dismiss
        </span>
      </div>
    </ToastContainer>
  );
};

ToastSuccess.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func
};

ToastError.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func
};

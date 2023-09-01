import { toast } from "react-toastify";
import { css } from "glamor";

const CustomToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: {
        color: "#1F691D",
        minHeight: "34px",
        background: "rgba(21, 164, 18, 0.2)",
        fontSize: "14px",
        lineHeight: "19px",
        padding: "5px 15px",
        boxShadow: "none"
      },
      hideProgressBar: true,
      progressClassName: css({
        display: "none"
      })
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: {
        minHeight: "34px",
        background: "rgba(21, 164, 18, 0.2)"
      },
      progressClassName: css({
        display: "none"
      })
    });
  }
};

export default CustomToast;

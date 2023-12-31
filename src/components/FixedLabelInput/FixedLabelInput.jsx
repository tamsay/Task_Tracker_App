import React, { forwardRef, useState } from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

import { FormGroup } from "./StyledInput";

import DateTimePicker from "@/components/DatePicker/DatePicker";

import eyeIconHide from "@/assets/icons/eye-password-hide.svg";
import eyeIconShow from "@/assets/icons/eye-password-show.svg";
import searchIcon from "@/assets/icons/search-icon.svg";

const FixedLabelInput = forwardRef(
  ({ placeholder, required, label, type = "text", onChange, error, icon, marginbottom, border, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      onChange(sanitizedValue);
    };

    const handleVisibility = () => {
      if (inputType === "password") {
        setShowPassword(true);
        return setInputType("text");
      } else if (inputType === "text") {
        setShowPassword(false);
        return setInputType("password");
      } else {
        return setInputType(inputType);
      }
    };

    const getDateTimeValue = (date) => {
      onChange(date);
    };

    return (
      <FormGroup marginbottom={marginbottom || "2rem"} border={border || "#e6e6e6"} required={required}>
        {label && <label>{label}</label>}
        <div className='input-container'>
          {icon && <img src={searchIcon} alt='search icon' />}
          {type === "datetime-local" ? (
            <DateTimePicker className='datePicker' dateValue={getDateTimeValue} value={props.value} />
          ) : (
            <input
              type={inputType}
              placeholder={placeholder}
              required={required}
              onChange={handleChange}
              {...props}
              autoComplete='new-password'
              ref={ref}
            />
          )}
          {type === "password" && (
            <img
              src={showPassword ? eyeIconHide : eyeIconShow}
              alt='eye-icon'
              className='eye-icon'
              onClick={handleVisibility}
            />
          )}
        </div>
        {error ? <span className='error'>{error}</span> : ""}
      </FormGroup>
    );
  }
);

FixedLabelInput.displayName = "FixedLabelInput";

FixedLabelInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  icon: PropTypes.bool,
  marginbottom: PropTypes.string,
  border: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string
};

export default FixedLabelInput;

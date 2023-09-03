import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { FormGroup } from "./StyledInput";
import eyeIconShow from "@/assets/icons/eye-password-show.svg";
import eyeIconHide from "@/assets/icons/eye-password-hide.svg";
import searchIcon from "@/assets/icons/search-icon.svg";
import DOMPurify from "dompurify";
import DateTimePicker from "@/components/DatePicker/DatePicker";


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
          {type === "datetime-local" ? <DateTimePicker className="datePicker" dateValue={getDateTimeValue} {...props} /> : <input
            type={inputType}
            placeholder={placeholder}
            required={required}
            onChange={handleChange}
            {...props}
            autoComplete='new-password'
            ref={ref}
          />}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FixedLabelInput;
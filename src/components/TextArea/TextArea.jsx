import React, { forwardRef } from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

import { FormGroup, StyledTextArea } from "./StyledTextArea";

const TextArea = forwardRef(
  ({ placeholder, required, onChange, error, marginbottom, minHeight, borderColor, bgColor, label, ...props }) => {
    const handleChange = (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      onChange(sanitizedValue);
    };

    return (
      <FormGroup marginbottom={marginbottom || "2rem"} bordercolor={borderColor} required={required}>
        {label && <label>{label}</label>}
        <StyledTextArea
          placeholder={placeholder}
          required={required}
          onChange={handleChange}
          minHeight={minHeight}
          bgColor={bgColor}
          {...props}
        />
        {error ? <p className='error'>{error}</p> : ""}
      </FormGroup>
    );
  }
);

TextArea.displayName = "TextArea";

TextArea.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  marginbottom: PropTypes.string,
  minHeight: PropTypes.string,
  error: PropTypes.string,
  borderColor: PropTypes.string,
  bgColor: PropTypes.string,
  label: PropTypes.string
};

export default TextArea;

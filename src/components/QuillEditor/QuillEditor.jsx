import React from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";

const QuillEditor = ({ placeholder, getQuillContent, label, error, ...props }) => {
  const handleChange = (content) => {
    getQuillContent(content);
  };

  var toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"] // remove formatting button
  ];

  return (
    <>
      {label && <label style={{ fontSize: "14px" }}>{label}</label>}
      <ReactQuill
        theme='snow'
        onChange={() => handleChange()}
        placeholder={placeholder}
        modules={{
          toolbar: toolbarOptions
        }}
        {...props}
      />
      {error ? (
        <p style={{ color: "#ff5964", fontSize: "14px" }} className='error'>
          {error}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

QuillEditor.propTypes = {
  placeholder: PropTypes.string,
  getQuillContent: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string
};

export default QuillEditor;

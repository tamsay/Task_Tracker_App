import { Form } from "react-bootstrap";
import styled from "styled-components";

export const FormGroup = styled(Form.Group)`
  display: block;
  position: relative;
  width: inherit;
  border-radius: 4px;
  margin-bottom: ${({ marginbottom }) => marginbottom};
  border: ${({ bordercolor }) => `1px solid ${bordercolor ? bordercolor : "#c8c8c8"}`};

  textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    transition: 0.3s;
    padding: 4px 10px 7.5px 10px;

    &:focus {
      outline: none;
      color: #344563;
    }
  }

  label {
    font-size: 14px;
    margin-bottom: 4px;
    transform-origin: top left;
    transition: all 0.2s ease-out;
    display: block;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    color: rgb(9, 30, 66);
    text-align: left;
    ${({ required }) =>
      required
        ? ` ::after {
        content: '*';
        color: red;
        padding-left: 5px;
      }`
        : ""};
  }

  .error {
    font-size: 14px;
    color: #eb5757;
    position: absolute;
    left: 0;
    bottom: -12.5%;
    text-align: left;
    margin: 0;
    line-height: 1;
  }
`;

export const StyledTextArea = styled.textarea`
  min-height: ${({ minHeight = "100px" }) => minHeight};
  font-size: ${({ fontSize = "1rem" }) => fontSize};
  color: ${({ color }) => color ?? "#5e6c84"};
  background-color: ${({ bgColor }) => bgColor ?? "#fff"};
`;

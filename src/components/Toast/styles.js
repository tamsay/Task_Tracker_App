import styled from "styled-components";

export const ToastContainer = styled.div`
  position: fixed;
  padding: 30px;
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
  top: 0;
  left: 0;
  grid-template-columns: minmax(1fr, 400px);
  z-index: 9999;
  justify-content: center;

  div.toast-inner {
    background: #cc3030;
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: 1fr auto;
    border-radius: 5px;
    color: #fff;
    overflow: hidden;
    align-items: center;
  }

  span.errors {
    display: block;
    padding: 10px;
    display: grid;
    align-items: center;
  }

  span.action {
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    display: block;
    padding: 10px;
    display: grid;
    align-items: center;
    &:hover {
      color: #f00;
    }
  }
`;

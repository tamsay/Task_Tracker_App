import styled from "styled-components";

export const TabWrapper = styled.div`
  background: ${({ background }) => background ?? "transparent"};
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0rem;
  width: 100%;
  // height: 100%;
  overflow-y: hidden !important;

  // @media screen and (max-width: 997px) {
  //   left: 0;
  //   z-index: 1;
  //   overflow-y: hidden !important;
  //   justify-content: center;
  //   }
`;

export const Tab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  // background-color: #D25B5D;
  // border: 1px solid #D25B5D;
  display: flex;
  padding: 0px 10px;
  gap: 0.25rem;
  // box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
  border-radius: 20px 20px 0px 0px;
`;

export const TabItem = styled.p`
  position: relative;
  cursor: pointer;
  font-style: normal;
  font-family: "Montserrat-Bold";
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 16px;
  display: grid;
  background-color: ${({ isActive }) => (isActive ? "#119A53" : "#transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#fff")};
  // border-bottom: ${({ isActive }) => (isActive ? "2px solid #D25B5D" : "none")};
  text-align: center;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem auto;
  width: 100%;
  white-space: nowrap;
  border-radius: 1.5rem;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#119A53" : "#119A53")};
    color: ${({ isActive }) => (isActive ? "#fff" : "#fff")};
  }
`;

export const TabContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: inherit;
`;

import styled from "styled-components";

export const TabWrapper = styled.div`
  background: ${({ background }) => background ?? "#fff"};
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-left: 0rem;
  width: 100%;
  // overflow-y: scroll !important;

  @media screen and (max-width: 997px) {
    left: 0;
    z-index: 1;
    // overflow-y: scroll !important;
  }
`;

export const Tab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  // background-color: #D25B5D;
  // border: 1px solid #D25B5D;
  display: flex;
  padding: 20px 10px;
  // padding: 0.125rem;
  // border-radius: 0.5rem;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
`;

export const LeftTab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  display: flex;
  padding: 20px 0px;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)}
`;

export const RightTab = styled.div`
  background: ${({ background }) => background ?? "#fcfcfc"};
  display: flex;
  padding: 20px 10px;
  box-shadow: 0px 1px 2px rgba(199, 223, 241, 0.25);
  ${({ centralise }) => (centralise ? "justify-content: center" : null)};

  @media all and (min-width: 992px) {
    margin-left: 0rem;
  }

  @media all and (min-width: 1200px) {
    margin-left: auto;
  }
`;

export const TabItem = styled.p`
  position: relative;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  display: grid;
  background-color: ${({ isActive }) => (isActive ? "#D25B5D" : "#FFF")};
  color: ${({ isActive }) => (isActive ? "#FFF" : "#D25B5D")};
  text-align: center;
  padding: 12px 24px;
  width: 100%;
  white-space: nowrap;
  border: 1px solid #d25b5d;
  font-weight: bold;
  border-radius: 0.125rem;
`;

export const TabContent = styled.div`
  width: 100%;
`;

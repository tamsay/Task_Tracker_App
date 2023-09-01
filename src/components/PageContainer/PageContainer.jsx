import React from "react";
import { Outlet } from "react-router-dom";
import cx from "classnames";

import styles from "./PageContainer.module.scss";

import NavBar from "@/components/NavBar/NavBar";

const PageContainer = () => {
  return (
    <div className={cx(styles.pageContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow")}>
        <NavBar />
      </div>
      <div className={cx(styles.children)}>
        <Outlet />
      </div>
    </div>
  );
};

export default PageContainer;

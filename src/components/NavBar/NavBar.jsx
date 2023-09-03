import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";
import { Icon } from "@iconify/react";

import styles from "./NavBar.module.scss";

import Button from "@/components/Button/Button";

import { showModal } from "@/redux/Modal/ModalSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const displayCreateModal = () => {
    dispatch(
      showModal({
        modalData: {
          action: "create",
          taskData: {}
        },
        name: "createAndModifyTask"
      })
    );
  };

  return (
    <>
      <Navbar collapseOnSelect expand='lg' className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo)}>
          <Link to='/'>
            <Icon icon='vscode-icons:file-type-light-todo' />
            {/* <Icon icon='logos:todomvc' /> */}
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse className={cx(styles.navbarCollapse, "flexRow")} id='responsive-navbar-nav'>
          <Nav className={cx(styles.primaryNavigation, "flexRow-space-between")}>
            <Button className={cx(styles.navButton)} title='Create Task' onClick={() => displayCreateModal()} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;

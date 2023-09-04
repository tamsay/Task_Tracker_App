import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import { Icon } from "@iconify/react";

import styles from "./NavBar.module.scss";

import Button from "@/components/Button/Button";

import { showModal } from "@/redux/Modal/ModalSlice";

import useIsMobile from "@/hooks/useIsMobile";

const NavBar = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const displayCreateModal = () => {
    setExpanded(false);

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

  const handleResetApp = () => {
    setExpanded(false);

    // display confirmation dialog
    dispatch(
      showModal({
        modalData: {
          action: "resetApp",
          title: "Reset App",
          message: "Are you sure you want to reset the app?"
        },
        name: "confirmationDialog"
      })
    );
  };

  const handleMenuClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar expanded={expanded} onToggle={handleToggle} expand='lg' className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo)}>
          <Link to='/'>
            <Icon icon='vscode-icons:file-type-light-todo' />
            <span>Task Tracker</span>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse className={cx(styles.navbarCollapse, "flexRow")} id='responsive-navbar-nav'>
          <Nav className={cx(styles.primaryNavigation, "flexRow-space-between")}>
            <Button className={cx(styles.navButton)} title='Create Task' onClick={() => displayCreateModal()} />
            <Button
              className={cx(styles.navButton)}
              title='Reset App'
              onClick={() => handleResetApp()}
              type='secondary'
            />
            {isMobile && (
              <>
                <NavLink onClick={handleMenuClick} to='/new-tasks'>
                  New Tasks
                </NavLink>
                <NavLink onClick={handleMenuClick} to='/completed-tasks'>
                  Completed Tasks
                </NavLink>
                <NavLink onClick={handleMenuClick} to='/uncompleted-tasks'>
                  Uncompleted Tasks
                </NavLink>
                <NavLink onClick={handleMenuClick} to='/deleted-tasks'>
                  Deleted Tasks
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;

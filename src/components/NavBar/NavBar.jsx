import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import { Icon } from "@iconify/react";

import styles from "./NavBar.module.scss";

import Button from "@/components/Button/Button";
import TestModal from "@/components/Modals/TestModal/TestModal";

import { hideModal, showModal } from "@/redux/Modal/ModalSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const modalData = useSelector((state) => state.modal.modalData);
  const displayModal = useSelector((state) => state.modal.show);
  const modalName = useSelector((state) => state.modal.modalName);

  console.log("modalData", modalData);
  console.log("displayModal", displayModal);
  console.log("modalName", modalName);

  const handleTestModal = () => {
    dispatch(showModal({ modalData: {}, name: "testModal" }));
  };

  return (
    <>
      <Navbar collapseOnSelect expand='lg' className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo)}>
          <Link to='/'>
            <Icon icon='vscode-icons:file-type-light-todo' />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse className={cx(styles.navbarCollapse, "flexRow")} id='responsive-navbar-nav'>
          <Nav className={cx(styles.primaryNavigation, "flexRow-space-between")}>
            {/* <NavLink  className={(navData) => navData.isActive && cx(styles.active)} end to="/"><Icon icon="cil:home" width={16} /> Home</NavLink>      
            <NavLink  className={(navData) => navData.isActive && cx(styles.active)} to="/products"><Icon icon="ph:film-slate-thin" width={16} /> Products</NavLink> */}
            <Button className={cx(styles.navButton)} title='Create Task' onClick={() => handleTestModal()} />
          </Nav>
        </Navbar.Collapse>
        {displayModal && modalName === "testModal" ? <TestModal show size='md' /> : null}
      </Navbar>
    </>
  );
};

export default NavBar;

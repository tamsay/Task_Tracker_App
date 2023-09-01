import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";

import errorIcon from "@/assets/icons/404-error.svg";

import "./Page404.scss";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <section className='error-page-container'>
      <div className='error-card'>
        <div>
          <img src={errorIcon} alt='404' />
        </div>
        <div className='error-text'>
          We are sorry, but the page you requested is tempoarily unavailable, had its name changed, has been removed or
          doesn’t exist.
        </div>
        <div>
          <Button
            onClick={() => navigate("/")}
            title='Go To The Homepage'
            textColor='#FFF'
            borderRadiusType='lowRounded'
            bordercolor=''
            bgColor='#A60473'
            hoverColor='#A60473'
            hoverBg='#FFF'
          />
        </div>
      </div>
    </section>
  );
};

export default Page404;

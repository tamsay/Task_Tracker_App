// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";
import Page404 from "@/pages/Page404/Page404";

import PageContainer from "@/components/PageContainer/PageContainer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const RoutesComponent = () => {
  return (
    <BrowserRouter className='App'>
      <ScrollToTop />
      <Routes>
        <Route element={<PageContainer />}>
          <Route path='' element={<HomePage />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;

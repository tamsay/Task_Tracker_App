// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CompletedTasks from "@/pages/HomePage/CompletedTasks/CompletedTasks";
import DeletedTasks from "@/pages/HomePage/DeletedTasks/DeletedTasks";
import HomePage from "@/pages/HomePage/HomePage";
import NewTasks from "@/pages/HomePage/NewTasks/NewTasks";
import UncompletedTasks from "@/pages/HomePage/UncompletedTasks/UncompletedTasks";
import Page404 from "@/pages/Page404/Page404";

import PageContainer from "@/components/PageContainer/PageContainer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const RoutesComponent = () => {
  return (
    <BrowserRouter className='App'>
      <ScrollToTop />
      <Routes>
        <Route element={<PageContainer />}>
          <Route path='' element={<HomePage />}>
            <Route path='/' element={<NewTasks />} />
            <Route path='new-tasks' index element={<NewTasks />} />
            <Route path='completed-tasks' element={<CompletedTasks />} />
            <Route path='deleted-tasks' element={<DeletedTasks />} />
            <Route path='uncompleted-tasks' element={<UncompletedTasks />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;

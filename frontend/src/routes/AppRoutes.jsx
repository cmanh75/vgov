import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import ShowInformation from '../pages/ShowInformation';
import ShowProject from '../pages/ShowProject';
import CreateUser from '../pages/CreateUser';
import ShowAllUsers from '../pages/ShowAllUsers';
import ShowAllProjects from '../pages/ShowAllProjects';
import EditUser from '../pages/EditUser';
import EditProject from '../pages/EditProject';
import CreateProject from '../pages/CreateProject';
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<ShowInformation />} />
      <Route path="/users" element={<ShowAllUsers />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/projects" element={<ShowAllProjects />} />
      <Route path="/projects/:id" element={<ShowProject />} />
      <Route path="/projects/edit/:id" element={<EditProject />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes; 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import ShowInformation from '../pages/ShowInformation';
import ShowProject from '../pages/ShowProject';
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/show-information/:id" element={<ShowInformation />} />
      <Route path="/show-project/:id" element={<ShowProject />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes; 
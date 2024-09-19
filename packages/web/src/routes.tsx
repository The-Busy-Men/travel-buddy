// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Landing from './pages/landing';
import { Test } from './pages/test/test-display';
import NotFound from './pages/error/notFound';
import Header from './pages/landing/components/header';
import Footer from './pages/landing/components/footer';
import { LoginBusiness } from './pages/login/login-business';
import {ObjectPage} from './pages/objects/admin';
import AllObjectsPage from './pages/objects/admin/object-all';
import { AdminMainPage } from './pages/admin/admin-overview';
import UserObjectPage from './pages/objects/users';

const HotelAdminPageWrapper = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  return <ObjectPage objectId={hotelId!} objectType="hotel" />;
};

const HotelUserPageWrapper = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  return <UserObjectPage objectId={hotelId!} objectType="hotel" />;
};

const AirBnbAdminPageWrapper = () => {
  const { airbnbId } = useParams<{ airbnbId: string }>();
  return <ObjectPage objectId={airbnbId!} objectType="airbnb" />;
};

const AirBnbUserPageWrapper = () => {
  const { airbnbId } = useParams<{ airbnbId: string }>();
  return <UserObjectPage objectId={airbnbId!} objectType="airbnb" />;
};

const AppRoutes = () => {
  // Check if the current route starts with "admin"
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Test />} />
        <Route path='/admin' element={<AdminMainPage />} />
        <Route path="/admin/hotels/:hotelId" element={<HotelAdminPageWrapper />} />
        <Route path="/admin/hotels" element={<AllObjectsPage objectType='hotel' />} />
        <Route path="/admin/airbnbs/:airbnbId" element={<AirBnbAdminPageWrapper />} />
        <Route path="/admin/airbnbs" element={<AllObjectsPage objectType='airbnb' />} />
        <Route path="/hotels/:hotelId" element={<HotelUserPageWrapper />} />
        <Route path="/airbnbs/:airbnbId" element={<AirBnbUserPageWrapper />} />
        <Route path="/b/login" element={<LoginBusiness />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </Router>
  );
};

export default AppRoutes;

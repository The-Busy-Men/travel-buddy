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
import GroupList from './pages/groups/groups-all';
import ObjectCreateForm from './pages/forms/object-create';

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
        {/* General */}
        <Route path="/" element={<Landing />} />
        <Route path='/about' element={undefined} />
        <Route path='/help' element={undefined} />
        <Route path='/tos' element={undefined} />
        <Route path='/privacy' element={undefined} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminMainPage />} />
          {/* Superadmin */}
          <Route path='/admin/settings' element={undefined} />
          <Route path='/admin/users' element={undefined} />
          <Route path='/admin/users/:userId' element={undefined} />

          {/* Admin */}
          <Route path="/admin/hotels" element={<AllObjectsPage objectType='hotel' />} />
          <Route path="/admin/hotels/:hotelId" element={<HotelAdminPageWrapper />} />
          <Route path="/admin/airbnbs" element={<AllObjectsPage objectType='airbnb' />} />
          <Route path="/admin/airbnbs/:airbnbId" element={<AirBnbAdminPageWrapper />} />
          <Route path="/admin/groups" element={<GroupList />} />
          <Route path='/admin/groups/:groupId' element={undefined} />
          <Route path='/admin/analytics' element={undefined} />
          <Route path='/admin/notifications' element={undefined} />

          {/* Moderator */}
          <Route path='/admin/reports' element={undefined} />
          <Route path='/admin/chats' element={undefined} />

        {/* User Routes */}
          {/* Objects */}
          <Route path='/hotels' element={undefined} />
          <Route path="/hotels/:hotelId" element={<HotelUserPageWrapper />} />
          
          <Route path='/airbnbs' element={undefined} />
          <Route path="/airbnbs/:airbnbId" element={<AirBnbUserPageWrapper />} />
          
          <Route path='/object/create' element={undefined} />
        
          {/* User specific */}
          <Route path='/groups' element={undefined} />
          <Route path='/groups/:groupId' element={undefined} />
          <Route path='/profile' element={undefined} />

          {/* Other */}
          <Route path='/destinations' element={undefined} />
          <Route path="/b/login" element={<LoginBusiness />} />

        {/* Testing Routes */}
        <Route path="/test" element={<Test />} />
        <Route path='/object/test' element={<ObjectCreateForm />} />

        {/* Error Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </Router>
  );
};

export default AppRoutes;

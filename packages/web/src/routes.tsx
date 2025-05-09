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
import ApprovalList from './pages/approvals/admin/approvalList';
import PreviewObjectPage from './pages/approvals/user/previewObject';
import { UUID } from 'crypto';

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

const PreviewPageWrapper = () => {
  const { approvalId } = useParams<{ approvalId: string }>();
  return <PreviewObjectPage approvalId={approvalId! as UUID} />
}

export const ROUTE = {
  INDEX: '',
  LOGIN: '/b/login',
  ADMIN: {
    INDEX: '/admin',
    SETTINGS: '/admin/settings',
    USERS: {
      INDEX: '/admin/users',
      USER: '/admin/users/:userId'
    },
    ANALYTICS: '/admin/analytics',
    NOTIFICATIONS: '/admin/notifications',
    REPORTS: '/admin/reports',
    CHATS: '/admin/chats',
  },
  ABOUT: '/about',
  HELP: '/help',
  TOS: '/tos',
  PRIVACY: '/privacy',
}

const AppRoutes = () => {
  // Check if the current route starts with "admin"
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      <Header />
      <Routes>
        {/* General */}
        <Route path={ROUTE.INDEX} element={<Landing />} />
        <Route path={ROUTE.ABOUT} element={undefined} />
        <Route path={ROUTE.HELP} element={undefined} />
        <Route path={ROUTE.TOS} element={undefined} />
        <Route path={ROUTE.PRIVACY} element={undefined} />

        {/* Admin Routes */}
        <Route path={ROUTE.ADMIN.INDEX} element={<AdminMainPage />} />
          {/* Superadmin */}
          <Route path={ROUTE.ADMIN.SETTINGS} element={undefined} />
          <Route path='/admin/users' element={undefined} />
          <Route path='/admin/users/:userId' element={undefined} />

          {/* Admin */}
          <Route path="/admin/hotels" element={<AllObjectsPage objectType='hotel' />} />
          <Route path="/admin/hotels/:hotelId" element={<HotelAdminPageWrapper />} />
          <Route path="/admin/airbnbs" element={<AllObjectsPage objectType='airbnb' />} />
          <Route path="/admin/airbnbs/:airbnbId" element={<AirBnbAdminPageWrapper />} />
          <Route path="/admin/groups" element={<GroupList />} />
          <Route path='/admin/groups/:groupId' element={undefined} />
          <Route path={ROUTE.ADMIN.ANALYTICS} element={undefined} />
          <Route path={ROUTE.ADMIN.NOTIFICATIONS} element={undefined} />
          <Route path='/admin/approvals' element={<ApprovalList />} />
          <Route path='/admin/approvals/:approvalId' element={<PreviewPageWrapper />} />

          {/* Moderator */}
          <Route path={ROUTE.ADMIN.REPORTS} element={undefined} />
          <Route path={ROUTE.ADMIN.CHATS} element={undefined} />

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
          <Route path={ROUTE.LOGIN} element={<LoginBusiness />} />

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

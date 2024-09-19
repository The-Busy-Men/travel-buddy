import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <div style={{ textAlign: 'center', padding: '100px' }} className='gap-10'>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for does not exist.</p>
    </div>
    <div className='flex justify-center'>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
    </>
  );
};

export default NotFound;

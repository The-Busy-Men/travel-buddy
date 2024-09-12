import React, { useEffect } from 'react';
import ObjectDetails from './objectDetails';
import { useObjects } from './hooks/useObjects';
import { Hotel, AirBnb } from '../../api/entities';
import { isUserAllowed, UserRoles } from '../utils/isUserAllowed';
import { useNavigate } from 'react-router-dom';

interface AllObjectPageProps {
  objectType: 'hotel' | 'airbnb';
}

export const AllObjectsPage = ({ objectType }: AllObjectPageProps) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    // Only run the check once when the component mounts
    if (!isUserAllowed({
      requiredRoles: [UserRoles.admin, UserRoles.super_admin],
      token: accessToken as string,
    })) {
      navigate('/');  // Redirect if the user is not allowed
    }
  }, [accessToken, navigate]);

  const { data, isLoading } = useObjects({ objectType });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No {objectType} found</p>;
  }

  // Map through the array of objects and render ObjectDetails for each
  return (
    <div className="object-list">
      {data.map((objectData: Hotel | AirBnb, index: number) => (
        <ObjectDetails key={index} objectData={objectData} objectType={objectType} />
      ))}
    </div>
  );
};

export default AllObjectsPage;

import React from 'react';
import { useObject } from '../admin/hooks/useObject';
import UserObjectDetails from './objectDetails';

interface ObjectPageProps {
  objectId: string; // Object ID passed as a prop
  objectType: 'hotel' | 'airbnb';
}

export const UserObjectPage = ({ objectId, objectType }: ObjectPageProps) => {
    // Determine the API endpoint based on the object type
    const {data, isLoading} = useObject({objectId, objectType})

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Object not found</p>;
  }

  return (
    <UserObjectDetails objectData={data} objectType={objectType} />
  );
};

export default UserObjectPage;

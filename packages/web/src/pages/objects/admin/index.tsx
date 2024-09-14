import React from 'react';
import ObjectDetails from './objectDetails';
import { useObject } from './hooks/useObject';

interface ObjectPageProps {
  objectId: string; // Object ID passed as a prop
  objectType: 'hotel' | 'airbnb';
}

export const ObjectPage = ({ objectId, objectType }: ObjectPageProps) => {
    // Determine the API endpoint based on the object type
    const {data, isLoading} = useObject({objectId, objectType})

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Object not found</p>;
  }

  return (
    <ObjectDetails objectData={data} objectType={objectType} />
  );
};

export default ObjectPage;

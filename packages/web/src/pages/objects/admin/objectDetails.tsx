import React from 'react';
import './components/objectDetails.css';
import { AirBnb, Hotel, PriceClass } from '../../../api/entities';
import StarsWithTooltip from './components/stars';
import { RiContactsBook3Line } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

// Type guard to check if objectData is of type Hotel or AirBnb
const isHotel = (objectData: Hotel | AirBnb): objectData is Hotel => {
  return (objectData as Hotel).priceClass !== undefined;
};

const isAirBnb = (objectData: Hotel | AirBnb): objectData is AirBnb => {
  return (objectData as AirBnb).hostName !== undefined;
};


const ObjectDetails = ({ objectData, objectType }: { objectData: Hotel | AirBnb; objectType: string }) => {
  if (!objectData) return <p>Loading...</p>;

  const getDynamicGradient = (value: number) => {
    if (value <= 50) {
      // For values <= 50, transition between crimson and dark orange smoothly
      return `linear-gradient(90deg, #b34242, #d67d2e)`;
    } else {
      // For values > 50, transition between dark orange and forest green
      return `linear-gradient(90deg, #d67d2e, #388e3c)`;
    }
  };

  // Hotel Attributes
  const priceClassNum = isHotel(objectData) ? objectData.priceClass as number : 0;
  const priceClass = PriceClass[priceClassNum].charAt(0).toUpperCase() + PriceClass[priceClassNum].slice(1)
  const stars = isHotel(objectData) ? objectData.stars : 0;
  const numberRooms = isHotel(objectData) ? objectData.numberRooms : 0;

  // AirBnb Attributes
  const hostName = isAirBnb(objectData) ? objectData.hostName : 'N/A';
  const bedrooms = isAirBnb(objectData) ? objectData.bedrooms : 0;
  const bathrooms = isAirBnb(objectData) ? objectData.bathrooms : 0;
  const isShared = isAirBnb(objectData) ? objectData.isShared : false;

  return (
    <section className="object-details">
      <div className="object-card">
        <div className="object-image">
          <a href={`/admin/hotels/${objectData.id}`}>
            <img
              src="https://via.placeholder.com/400x200" // Replace with actual image URL if available
              alt={objectData.name}
            />
          </a>
          <div className='flex flex-row p-5'>
            <RiContactsBook3Line strokeWidth={2} className='mt-1 mr-1' /> 
            <p className='font-bold'>Owner(s):</p>
            {/* Owner will be User, Click to start chat */}
            {objectData.owners.map((owner) => 
            <div className='ml-2 hover:text-blue-300'>
              <a href="/" className='underline underline-offset-1'>{owner}</a>
            </div>
            )}
          </div>
          <div className='flex flex-row p-5'>
            <FaPeopleGroup strokeWidth={2} className='mt-1 mr-1' /> <p className='font-bold mr-2'>Groups:</p> <a href="/" className='text-red-400 hover:underline underline-offset-1'>NONE</a>
          </div>
          <div className='max-w-fit ml-5 mt-5 flex flex-row p-2 btn-object cursor-pointer' onClick={() => console.log("Navigate to settings")}>
            <IoIosSettings className='mt-1 mr-2' strokeWidth={2} />Object Settings
          </div>
        </div>
        <div className="object-info">
          <h2>{objectData.name}</h2>
          <p className="object-description">{objectData.description || 'No description available.'}</p>
          <p className='font-bold hover:text-green-400 hover:cursor-pointer max-w-fit' onClick={() => navigator.clipboard.writeText(objectData.id)}>Object ID: {objectData.id}</p>

          {/* Shared object fields */}
          <div className="object-meta">
            <div className="meta-item">
              <span className="label">Rating:</span>
              <div className="rating-bar-container">
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${(objectData.rating as number)/100 * 100}%`, background: getDynamicGradient(objectData.rating as number), }}
                  />
                </div>
                <span className="rating-number">{objectData.rating}/100</span>
              </div>
            </div>

            <div className="meta-item">
              <span className="label">Active:</span>
              <span className={`chip active-chip ${objectData.active ? 'active' : 'inactive'}`}>
                {objectData.active ? 'Yes' : 'No'}
              </span>
            </div>

            {/* Hotel-specific fields */}
            {objectType === 'hotel' && (
              <>
                <div className="meta-item">
                  <span className="label">Stars:</span>
                  <StarsWithTooltip rating={stars as number} />
                </div>
                <div className="meta-item">
                  <span className="label">Number of Rooms:</span>
                  <span className="value">{numberRooms || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Price Class:</span>
                  <span className="value">{priceClass || 'N/A'}</span>
                </div>
              </>
            )}

            {/* Airbnb-specific fields */}
            {objectType === 'airbnb' && (
              <>
                <div className="meta-item">
                  <span className="label">Host Name:</span>
                  <span className="value">{hostName || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Bedrooms:</span>
                  <span className="value">{bedrooms || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Bathrooms:</span>
                  <span className="value">{bathrooms || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Is Shared:</span>
                  <span className="value">{isShared ? 'Yes' : 'No'}</span>
                </div>
              </>
            )}
          </div>

          <div className="object-amenities">
            <h3>Amenities</h3>
            <p>{objectData.amenities || 'No amenities listed.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectDetails;

import React from 'react';
import './components/objectDetails.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AirBnb, Hotel, PriceClass } from '../../api/entities';

// Function to render stars based on hotel rating
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (rating + 0.5 === i) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }
  return stars;
};

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
      // For values <= 50, interpolate between crimson and dark orange
      return `linear-gradient(90deg, #b34242 0%, #d67d2e ${value}%, #e0e0e0 ${value}%)`;
    } else {
      // For values > 50, interpolate between dark orange and forest green
      return `linear-gradient(90deg, #b34242 0%, #d67d2e 50%, #388e3c ${value}%, #e0e0e0 ${value}%)`;
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
          <img
            src="https://via.placeholder.com/400x200" // Replace with actual image URL if available
            alt={objectData.name}
          />
        </div>
        <div className="object-info">
          <h2>{objectData.name}</h2>
          <p className="object-description">{objectData.description || 'No description available.'}</p>

          {/* Shared object fields */}
          <div className="object-meta">
            <div className="meta-item">
              <span className="label">Rating:</span>
              <div className="rating-bar-container">
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${objectData.rating}%`, background: getDynamicGradient(objectData.rating as number), }}
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
                  <div className="stars-container">{renderStars(stars || 0)}</div>
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

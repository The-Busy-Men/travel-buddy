import React from 'react';
import './components/objectDetails.css';
import { AirBnb, Hotel, PriceClass } from '../../../api/entities';
import StarsWithTooltip from '../admin/components/stars';
import RatingWithTooltip from './components/ratings';

// Type guard to check if objectData is of type Hotel or AirBnb
const isHotel = (objectData: Hotel | AirBnb): objectData is Hotel => {
  return (objectData as Hotel).priceClass !== undefined;
};

const isAirBnb = (objectData: Hotel | AirBnb): objectData is AirBnb => {
  return (objectData as AirBnb).hostName !== undefined;
};

const UserObjectDetails = ({ objectData, objectType }: { objectData: Hotel | AirBnb; objectType: string }) => {

  const priceClassNum = isHotel(objectData) ? objectData.priceClass as number : 0;
  const priceClass = PriceClass[priceClassNum].charAt(0).toUpperCase() + PriceClass[priceClassNum].slice(1);
  const stars = isHotel(objectData) ? objectData.stars : 0;
  const numberRooms = isHotel(objectData) ? objectData.numberRooms : 0;

  const hostName = isAirBnb(objectData) ? objectData.hostName : 'N/A';
  const bedrooms = isAirBnb(objectData) ? objectData.bedrooms : 0;
  const bathrooms = isAirBnb(objectData) ? objectData.bathrooms : 0;
  const isShared = isAirBnb(objectData) ? objectData.isShared : false;

  return (
    <>
    <div className="min-h-screen mt-4 mb-4">
      {/* Main Content */}
      <div className="max-w-screen-lg mx-auto mt-2">
        <div className="flex space-x-4">
          {/* Photo Gallery */}
          <div className="w-1/2 flex flex-col space-y-3">
            <img
              src="https://via.placeholder.com/300"
              alt="Thumbnail 1"
              className="h-40 object-cover shadow-lg rounded-lg"
            />
            <img
              src="https://via.placeholder.com/300"
              alt="Thumbnail 2"
              className="h-40 object-cover shadow-lg rounded-lg"
            />
            <img
              src="https://via.placeholder.com/300"
              alt="Thumbnail 3"
              className="h-40 object-cover shadow-lg rounded-lg"
            />
          </div>

          {/* Main Image */}
          <div className="w-1/2">
            <img
              src="https://via.placeholder.com/600"
              alt="Main"
              className="w-full h-full object-cover shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 flex space-x-4 min-h-screen">
          {/* Information */}
          <div className="w-2/3 bg-white shadow-2xl p-10 rounded-lg">
            <div className='flex flex-row border-b border-black items-center h-auto p-4 m-0'>
              <div>
                <h1 className="text-3xl font-bold text-black">{objectData.name}</h1>
              </div>
              <div hidden={!isHotel(objectData)} className='ml-16'>
                <StarsWithTooltip rating={stars as number} />
              </div>
              {/* <div className="rating-bar-container ml-8">
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${(objectData.rating as number)/100 * 100}%`, background: getDynamicGradient(objectData.rating as number), }}
                  />
                  <div className='tooltip'>1000</div>
                </div>
              </div> */}
              <RatingWithTooltip rating={objectData.rating as number} />
            </div>
            <div className="text-gray-500 m-4">{objectData.description}</div>
            <div className="mt-10 flex flex-col mr-auto space-y-4">
              <h1 className='font-bold text-black text-xl border-b border-black border-dashed max-w-fit'>Informations</h1>
              {isHotel(objectData) ?
              <>
                <div className=''>
                  <h2 className='text-lg font-semibold'>Price Class</h2>
                  <p className=''>{priceClass}</p>
                </div>
                <div>
                  <h2 className='text-lg font-semibold'>Number of Rooms</h2>
                  <p>{numberRooms}</p>
                </div>
              </>: 
              <>
                <div className=''>
                  <h2 className='text-lg font-semibold'>Host Name</h2>
                  <p className=''>{hostName}</p>
                </div>
                <div>
                  <h2 className='text-lg font-semibold'>Bedrooms</h2>
                  <p>{bedrooms}</p>
                </div>
                <div className=''>
                  <h2 className='text-lg font-semibold'>Bathrooms</h2>
                  <p className=''>{bathrooms}</p>
                </div>
                <div>
                  <h2 className='text-lg font-semibold'>Shared</h2>
                  <p>{isShared ? 'Yes' : 'No'}</p>
                </div>
              </>
              }
            </div>
          </div>

          {/* Booking Section */}
          <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-2">$526 / night</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Check-in</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Check-out</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Guests</label>
              <input
                type="number"
                defaultValue="1"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className='mt-auto'>
              <div className="text-lg font-semibold">
                $1052 for 2 nights
              </div>
              <div className="text-sm text-gray-500">
                + Cleaning Fee: $25
              </div>
              <div className="text-sm text-gray-500 mb-10">
                + Taxes: $50
              </div>
              <div className="mt-4 text-2xl font-bold">
                Total: $1127
              </div>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserObjectDetails;

import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarsWithTooltipProps {
  rating: number;
} 
const starDescriptions = ['Bad', 'Poor', 'Average', 'Good', 'Excellent'];

// Function to render stars with a tooltip
const StarsWithTooltip: React.FC<StarsWithTooltipProps> = ({ rating }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Determine the description and color based on the rating
  const getTooltipDescription = () => {
    if (rating <= 1) return starDescriptions[0];
    if (rating <= 2) return starDescriptions[1];
    if (rating <= 3) return starDescriptions[2];
    if (rating <= 4) return starDescriptions[3];
    return starDescriptions[4];
  };

  const getTooltipColor = () => {
    if (rating <= 1) return '#d13100'; // Red for bad
    if (rating <= 2) return '#e06900'; // Orange for poor
    if (rating <= 3) return '#e0a400'; // Yellow for average
    if (rating <= 4) return '#71c700'; // Light green for good
    return '#39a300'; // Green for excellent
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      rating >= i ? (
        <FaStar key={i} color={getTooltipColor()} />
      ) : rating + 0.5 === i ? (
        <FaStarHalfAlt key={i} color={getTooltipColor()} />
      ) : (
        <FaRegStar key={i} color={getTooltipColor()} />
      )
    );
  }

  return (
    <div
      className="stars-container"
      style={{ position: 'relative' }}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {stars}
      {tooltipVisible && (
        <div
          className="stars-tooltip"
          style={{
            position: 'absolute',
            top: '-25px',
            left: '0',
            backgroundColor: getTooltipColor(),
            padding: '5px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
          }}
        >
          {getTooltipDescription()}
        </div>
      )}
    </div>
  );
};

export default StarsWithTooltip;
  


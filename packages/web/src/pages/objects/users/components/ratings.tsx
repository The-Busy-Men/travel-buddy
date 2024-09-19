import React, { useState } from 'react';
import { interpolateColor } from '../utils/colors';

interface RatingWithTooltipProps {
  rating: number;
}

// Function to render stars with a tooltip
const RatingWithTooltip: React.FC<RatingWithTooltipProps> = ({ rating }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const getDynamicGradient = (value: number) => {
    if (value <= 50) {
      // For values <= 50, transition between crimson and dark orange smoothly
      return `linear-gradient(90deg, #b34242, #d67d2e)`;
    } else {
      // For values > 50, transition between dark orange and forest green
      return `linear-gradient(90deg, #d67d2e, #388e3c)`;
    }
  };

  const getTooltipColor = (rating: number) => {
    if (rating <= 50) {
      const factor = rating / 50;
      return interpolateColor('#b34242', '#d67d2e', factor);
    } else {
      const factor = (rating - 50) / 50;
      return interpolateColor('#d67d2e', '#388e3c', factor);
    }
  };

  return (
    <>
    <div
      className="rating-bar-container ml-8"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <div
        className="rating-bar"
      >
        <div
          className="rating-bar-fill"
          style={{
            width: `${rating}%`, // Rating as percentage
            background: getDynamicGradient(rating),
          }}
        />
      </div>
    </div>
    {tooltipVisible && (
      <div
        className="rating-tooltip ml-4"
        style={{
          background: getTooltipColor(rating),
        }}
      >
        Average User Rating: {rating}/100
      </div>
    )}
    </>
  );
};

export default RatingWithTooltip;

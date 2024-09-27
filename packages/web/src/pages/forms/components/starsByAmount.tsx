import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarsByAmount {
  amount: number;
} 

// eslint-disable-next-line @typescript-eslint/no-redeclare
const StarsByAmount: React.FC<StarsByAmount> = ({ amount }) => {
  const starColor = '#FFD700';

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      amount >= i ? (
        <FaStar key={i} color={starColor} />
      ) : (
        <FaRegStar key={i} color={starColor} />
      )
    );
  }

  return (
    <div
      className="stars-container"
      style={{ position: 'relative' }}
    >
      {stars}
    </div>
  );
};

export default StarsByAmount;
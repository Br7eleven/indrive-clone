
import React from 'react';
import { StarIcon } from './icons/Icons';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            className={`w-4 h-4 ${
              starValue <= rating ? 'text-yellow-400' : 'text-gray-500'
            }`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

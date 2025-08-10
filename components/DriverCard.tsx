
import React from 'react';
import type { Driver } from '../types';
import StarRating from './StarRating';

interface DriverCardProps {
  driver: Driver;
  onSelect: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="bg-gray-700 rounded-xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-200 hover:bg-gray-600 hover:scale-[1.02] active:scale-[0.99] animate-driver-enter"
    >
      <img src={driver.imageUrl} alt={driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-500" />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg">{driver.name}</h3>
                <p className="text-sm text-gray-400">{driver.carModel}</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg text-green-400">${driver.price}</p>
                <p className="text-sm text-gray-300">{driver.eta} away</p>
            </div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <StarRating rating={driver.rating} />
          <span className="text-xs text-gray-400">{driver.rating.toFixed(1)} ({driver.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;

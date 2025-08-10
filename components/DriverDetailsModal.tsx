import React, { useState } from 'react';
import type { Driver } from '../types';
import StarRating from './StarRating';
import { CloseIcon, CarIcon, ShieldCheckIcon } from './icons/Icons';

interface DriverDetailsModalProps {
  driver: Driver;
  onClose: () => void;
  onConfirm: (driver: Driver) => void;
}

const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({ driver, onClose, onConfirm }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Match animation duration
    };
    
    const handleConfirm = () => {
        setIsClosing(true);
        setTimeout(() => onConfirm(driver), 300);
    };

    const modalAnimationClass = isClosing ? 'animate-slide-down' : 'animate-slide-up';

    return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50">
            <div 
                className={`w-full max-w-md bg-gray-800 rounded-t-3xl shadow-lg p-6 ${modalAnimationClass}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Driver Details</h2>
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                        <CloseIcon className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                    <img src={driver.imageUrl} alt={driver.name} className="w-20 h-20 rounded-full border-4 border-gray-700 object-cover" />
                    <div>
                        <h3 className="text-xl font-bold">{driver.name}</h3>
                        <div className="flex items-center space-x-2">
                           <StarRating rating={driver.rating} />
                           <span className="text-gray-400">({driver.reviews} reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                        <CarIcon className="w-6 h-6 text-green-400 mr-4"/>
                        <div>
                            <p className="font-semibold">{driver.carModel} <span className="text-gray-400">({driver.carColor})</span></p>
                            <p className="text-lg font-mono bg-gray-600 px-2 py-1 rounded-md inline-block mt-1">{driver.plateNumber}</p>
                        </div>
                    </div>
                     <div className="flex items-center bg-gray-700 p-3 rounded-lg">
                        <ShieldCheckIcon className="w-6 h-6 text-green-400 mr-4"/>
                        <div>
                            <p className="font-semibold">Verified Driver</p>
                            <p className="text-sm text-gray-400">Background check completed.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleConfirm}
                    className="w-full mt-8 bg-green-500 text-white font-bold py-4 rounded-xl transition-all duration-300 ease-in-out hover:bg-green-600 active:scale-95"
                >
                    Confirm Ride for ${driver.price}
                </button>
            </div>
            <style>
            {`
            @keyframes slide-up {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            @keyframes slide-down {
                from { transform: translateY(0); }
                to { transform: translateY(100%); }
            }
            .animate-slide-up {
                animation: slide-up 0.3s ease-out forwards;
            }
            .animate-slide-down {
                animation: slide-down 0.3s ease-out forwards;
            }
            `}
            </style>
        </div>
    );
};

export default DriverDetailsModal;
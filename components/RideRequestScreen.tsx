
import React, { useState, useEffect } from 'react';
import type { RideDetails, Driver } from '../types';
import Header from './Header';
import DriverCard from './DriverCard';
import { CarIcon } from './icons/Icons';

interface RideRequestScreenProps {
  rideDetails: RideDetails;
  onSelectDriver: (driver: Driver) => void;
  onBack: () => void;
}

const mockDrivers: Driver[] = [
  { id: 1, name: 'John D.', carModel: 'Toyota Camry', carColor: 'Silver', plateNumber: 'B456-FGH', rating: 4.9, reviews: 124, eta: '3 min', price: 15, imageUrl: 'https://picsum.photos/seed/driver1/200/200' },
  { id: 2, name: 'Maria S.', carModel: 'Honda Civic', carColor: 'Black', plateNumber: 'C789-JKL', rating: 4.8, reviews: 88, eta: '5 min', price: 14, imageUrl: 'https://picsum.photos/seed/driver2/200/200' },
  { id: 3, name: 'Alex T.', carModel: 'Ford Fusion', carColor: 'White', plateNumber: 'D101-MNO', rating: 5.0, reviews: 210, eta: '2 min', price: 18, imageUrl: 'https://picsum.photos/seed/driver3/200/200' },
  { id: 4, name: 'Sophie L.', carModel: 'Nissan Altima', carColor: 'Blue', plateNumber: 'E112-PQR', rating: 4.7, reviews: 56, eta: '7 min', price: 12, imageUrl: 'https://picsum.photos/seed/driver4/200/200' },
];

const RideRequestScreen: React.FC<RideRequestScreenProps> = ({ rideDetails, onSelectDriver, onBack }) => {
  const [price, setPrice] = useState(15);
  const [visibleDrivers, setVisibleDrivers] = useState<Driver[]>([]);
  const [status, setStatus] = useState<'searching' | 'done'>('searching');

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Simulate drivers appearing one by one
    mockDrivers.forEach((driver, index) => {
        const timeout = setTimeout(() => {
            setVisibleDrivers(prev => [...prev, driver]);
        }, (index + 1) * 800 + 500); // Staggered appearance
        timeouts.push(timeout);
    });

    // After all potential drivers have had time to appear, update status
    const finalTimeout = setTimeout(() => {
        setStatus('done');
    }, (mockDrivers.length * 800) + 1000);
    timeouts.push(finalTimeout);

    // Cleanup timeouts on component unmount
    return () => {
        timeouts.forEach(clearTimeout);
    };
  }, []);


  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <Header title="Choose a driver" onBack={onBack} />
      
      <div className="p-4 bg-gray-700/50">
          <div className="bg-gray-900/70 p-4 rounded-xl">
              <p className="text-xs text-gray-400">Pickup</p>
              <p className="font-semibold">{rideDetails.pickup}</p>
              <div className="border-t border-dashed border-gray-600 my-2"></div>
              <p className="text-xs text-gray-400">Destination</p>
              <p className="font-semibold">{rideDetails.dropoff}</p>
          </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {visibleDrivers.length === 0 && status === 'searching' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                <p className="text-lg font-semibold">Waiting for driver offers...</p>
            </div>
        )}
        {visibleDrivers.map(driver => (
          <DriverCard key={driver.id} driver={driver} onSelect={() => onSelectDriver(driver)} />
        ))}
        {visibleDrivers.length === 0 && status === 'done' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                <CarIcon className="w-16 h-16 mb-4 text-gray-500" />
                <h3 className="text-xl font-semibold text-white">No Drivers Found</h3>
                <p className="max-w-xs mt-2">Try increasing your offer or check again in a few minutes.</p>
            </div>
        )}
      </div>

      <div className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-between bg-gray-700 rounded-xl p-3">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Your offer</span>
            <span className="text-2xl font-bold text-green-400">${price}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setPrice(p => Math.max(5, p - 1))} className="w-10 h-10 bg-gray-600 rounded-full text-2xl font-bold flex items-center justify-center active:bg-gray-500 transition">-</button>
            <button onClick={() => setPrice(p => p + 1)} className="w-10 h-10 bg-gray-600 rounded-full text-2xl font-bold flex items-center justify-center active:bg-gray-500 transition">+</button>
          </div>
        </div>
        <button
          className="w-full mt-3 bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out hover:bg-green-600 active:scale-95"
        >
          <CarIcon className="w-6 h-6" />
          <span>Request a ride</span>
        </button>
      </div>
      <style>
      {`
      @keyframes enter-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }
      .animate-driver-enter {
          animation: enter-up 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
      }
      `}
      </style>
    </div>
  );
};

export default RideRequestScreen;

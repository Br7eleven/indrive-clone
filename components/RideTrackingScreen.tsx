import React, { useState, useEffect } from 'react';
import type { Driver, RideDetails } from '../types';
import { CarIcon, PhoneIcon } from './icons/Icons';
import StarRating from './StarRating';

interface RideTrackingScreenProps {
  driver: Driver;
  rideDetails: RideDetails;
  onCancel: () => void;
}

const RideTrackingScreen: React.FC<RideTrackingScreenProps> = ({ driver, rideDetails, onCancel }) => {
  const initialMinutes = parseInt(driver.eta.split(' ')[0], 10);
  const [etaSeconds, setEtaSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (seconds: number) => {
    if (seconds <= 0) return 'Arriving now';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins} min ${secs} sec`;
    return `${secs} sec`;
  };

  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x600&markers=color:blue%7Clabel:A%7C${encodeURIComponent(rideDetails.pickup)}&markers=color:green%7Clabel:B%7C${encodeURIComponent(rideDetails.dropoff)}&path=weight:3%7Ccolor:0x0000ff80%7Cenc: Polyline_here&key=YOUR_GOOGLE_MAPS_API_KEY`;
  
  return (
    <div className="relative h-full w-full bg-gray-900 text-white flex flex-col">
        {/* Map Background */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop')`, opacity: 0.5 }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
            <div className="p-6 text-center">
                <p className="text-xl font-bold">Your driver is on the way!</p>
                <p className="text-4xl font-bold text-green-400 mt-2">{formatEta(etaSeconds)}</p>
            </div>
            
            <div className="flex-grow">
                {/* This space could contain the interactive map view */}
            </div>

            {/* Bottom Info Panel */}
            <div className="bg-gray-800/80 backdrop-blur-md p-4 rounded-t-2xl">
                <div className="flex items-center space-x-4">
                    <img src={driver.imageUrl} alt={driver.name} className="w-20 h-20 rounded-full border-4 border-gray-700 object-cover" />
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold">{driver.name}</h3>
                        <div className="flex items-center space-x-2">
                           <StarRating rating={driver.rating} />
                           <span className="text-gray-400 text-sm">({driver.reviews})</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center bg-gray-700 p-3 rounded-lg mt-4">
                    <CarIcon className="w-8 h-8 text-green-400 mr-4"/>
                    <div>
                        <p className="font-semibold">{driver.carModel} <span className="text-gray-400">({driver.carColor})</span></p>
                        <p className="text-xl font-mono bg-gray-600 px-2 py-1 rounded-md inline-block mt-1 tracking-widest">{driver.plateNumber}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3 mt-4">
                    <button className="flex-1 bg-gray-600 hover:bg-gray-500 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                        <PhoneIcon className="w-5 h-5"/>
                        <span>Call Driver</span>
                    </button>
                    <button onClick={onCancel} className="flex-1 bg-red-800/70 hover:bg-red-700 font-bold py-3 rounded-xl transition-colors">
                        Cancel Ride
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RideTrackingScreen;
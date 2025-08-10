import React from 'react';
import Header from './Header';
import type { PastRide } from '../types';
import { CarIcon, LocationPinIcon } from './icons/Icons';

const mockPastRides: PastRide[] = [
    { id: 1, date: '2024-07-20', pickup: '123 Main St, Downtown', dropoff: '456 Oak Ave, Suburbia', price: 18, driverName: 'Alex T.' },
    { id: 2, date: '2024-07-18', pickup: '789 Pine Ln, Uptown', dropoff: '101 Maple Dr, City Center', price: 22, driverName: 'John D.' },
    { id: 3, date: '2024-07-15', pickup: '210 Elm St, West End', dropoff: '333 Birch Rd, Northside', price: 14, driverName: 'Maria S.' },
    { id: 4, date: '2024-07-12', pickup: '555 Cedar Ct, Southpark', dropoff: '777 Spruce Way, Eastville', price: 25, driverName: 'Sophie L.' },
];

const PastRideCard: React.FC<{ ride: PastRide }> = ({ ride }) => (
    <div className="bg-gray-700 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-400">{new Date(ride.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-sm text-gray-300">with {ride.driverName}</p>
            </div>
            <p className="font-bold text-lg text-green-400">${ride.price}</p>
        </div>
        <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
                <LocationPinIcon className="w-4 h-4 text-gray-400 shrink-0"/>
                <p className="truncate text-white">{ride.pickup}</p>
            </div>
             <div className="flex items-center space-x-2 text-sm">
                <LocationPinIcon className="w-4 h-4 text-green-400 shrink-0"/>
                <p className="truncate text-white">{ride.dropoff}</p>
            </div>
        </div>
        <button className="w-full text-center py-2 mt-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-semibold transition-colors">View Details</button>
    </div>
)

const ActivityScreen: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-gray-800 text-white">
            <Header title="Ride History" />
            <div className="flex-grow overflow-y-auto">
                {mockPastRides.length > 0 ? (
                    <div className="p-4 space-y-4">
                        {mockPastRides.map(ride => <PastRideCard key={ride.id} ride={ride} />)}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <CarIcon className="w-16 h-16 mb-4" />
                        <h3 className="text-xl font-semibold">No Recent Activity</h3>
                        <p className="text-center max-w-xs mt-2">Your past rides will appear here once you complete a trip.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityScreen;

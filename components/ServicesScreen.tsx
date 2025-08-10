import React from 'react';
import Header from './Header';
import { BoxIcon, TruckIcon, RouteIcon } from './icons/Icons';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <button className="bg-gray-700 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 w-full">
        <div className="bg-green-500/20 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </button>
);

const ServicesScreen: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-gray-800 text-white">
            <Header title="Services" />
            <div className="p-6 flex-grow">
                <div className="space-y-4">
                    <p className="text-gray-300">Explore other services we offer to make your life easier.</p>
                    <div className="grid grid-cols-1 gap-4">
                        <ServiceCard 
                            icon={<BoxIcon className="w-8 h-8 text-green-400" />}
                            title="Courier"
                            description="Send packages and documents across the city."
                        />
                        <ServiceCard 
                            icon={<TruckIcon className="w-8 h-8 text-green-400" />}
                            title="Cargo"
                            description="Move heavy and bulky items with ease."
                        />
                        <ServiceCard 
                            icon={<RouteIcon className="w-8 h-8 text-green-400" />}
                            title="City to City"
                            description="Travel between cities comfortably and affordably."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;

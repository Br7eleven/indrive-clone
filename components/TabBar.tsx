import React from 'react';
import type { Screen } from '../types';
import { AppScreen } from '../types';
import { CarIcon, GridIcon, ClockIcon, UserIcon } from './icons/Icons';

interface TabBarProps {
    activeScreen: Screen;
    onNavigate: (screen: Screen) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeScreen, onNavigate }) => {

    const tabs = [
        { name: 'Ride', screen: AppScreen.Home, icon: CarIcon },
        { name: 'Services', screen: AppScreen.Services, icon: GridIcon },
        { name: 'Activity', screen: AppScreen.Activity, icon: ClockIcon },
        { name: 'Profile', screen: AppScreen.Profile, icon: UserIcon },
    ];

    return (
        <div className="flex justify-around items-center bg-gray-800 border-t border-gray-700 h-20 px-2 shrink-0">
            {tabs.map(tab => {
                const isRideTabActive = tab.name === 'Ride' && (activeScreen === AppScreen.Home || activeScreen === AppScreen.RideRequest);
                const isOtherTabActive = tab.screen === activeScreen;
                const isActive = isRideTabActive || isOtherTabActive;

                const IconComponent = tab.icon;
                return (
                    <button 
                        key={tab.name} 
                        onClick={() => onNavigate(tab.screen)}
                        className={`flex flex-col items-center justify-center w-1/4 h-full transition-colors focus:outline-none ${isActive ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <IconComponent className="w-7 h-7 mb-1" />
                        <span className="text-xs font-medium">{tab.name}</span>
                    </button>
                )
            })}
        </div>
    );
};

export default TabBar;
